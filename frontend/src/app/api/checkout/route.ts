import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define types for the request
interface CheckoutRequest {
  items: {
    productId: string;
    quantity: number;
    customization?: {
      color_id?: string;
      pattern_id?: string;
      text?: string;
      design?: string;
    };
  }[];
  customerInfo: {
    email: string;
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentInfo?: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvc: string;
  };
}

// Calculate price with customizations
function calculatePriceWithCustomizations(basePrice: number, customization?: any): number {
  let finalPrice = basePrice;
  
  if (customization) {
    // Add charges for customization options
    if (customization.text) finalPrice += 5.00; // $5 for adding text
    if (customization.color_id) finalPrice += 3.00; // $3 for color customization
    if (customization.pattern_id) finalPrice += 2.00; // $2 for pattern customization
    if (customization.design) finalPrice += 8.00; // $8 for special design
  }
  
  return finalPrice;
}

export async function POST(request: Request) {
  try {
    // Log that we're starting a checkout request
    console.log("Starting checkout process...");
    
    // Parse the request body
    const body: CheckoutRequest = await request.json();
    console.log("Received checkout request body:", JSON.stringify(body, null, 2));
    
    if (!body.items || body.items.length === 0) {
      console.error("No items provided in checkout request");
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Get user from cookie if available
    const sessionCookie = cookies().get("session")?.value;
    const userId = sessionCookie 
      ? JSON.parse(atob(sessionCookie.split(".")[1])).sub 
      : "guest";
    
    console.log("User ID from session:", userId);

    // Calculate total price
    let totalAmount = 0;
    const lineItems = [];
    
    for (const item of body.items) {
      try {
        // In a real app, you would fetch product from database
        // For now using mock data
        const product = {
          id: item.productId,
          name: `Product ${item.productId}`,
          price: 29.99, // Base price
          description: "Product description",
        };
        
        // Calculate price with customizations
        const unitAmount = calculatePriceWithCustomizations(
          product.price, 
          item.customization
        );
        
        // Create a descriptive name with customization details
        let productName = product.name;
        if (item.customization) {
          if (item.customization.color_id) {
            productName += ` - Color ID: ${item.customization.color_id}`;
          }
          if (item.customization.pattern_id) {
            productName += ` - Pattern ID: ${item.customization.pattern_id}`;
          }
        }
        
        const itemTotal = unitAmount * item.quantity;
        totalAmount += itemTotal;
        
        lineItems.push({
          productId: item.productId,
          name: productName,
          quantity: item.quantity,
          unitPrice: unitAmount,
          totalPrice: itemTotal,
          customization: item.customization || {}
        });
        
        console.log(`Added order item: ${productName}, quantity: ${item.quantity}, price: ${unitAmount}`);
      } catch (itemError) {
        console.error("Error processing item:", item, itemError);
        // Continue with other items
      }
    }
    
    if (lineItems.length === 0) {
      console.error("Failed to process any items");
      return NextResponse.json({ error: "Failed to process any items" }, { status: 400 });
    }

    // Add shipping and tax
    const shipping = totalAmount >= 50 ? 0 : 5.99;
    const tax = totalAmount * 0.08;
    const orderTotal = totalAmount + shipping + tax;
    
    // Validate payment information if provided
    if (body.paymentInfo) {
      const { cardNumber, cardholderName, expiryDate, cvc } = body.paymentInfo;
      
      // Basic validation
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
        return NextResponse.json({ error: "Invalid card number" }, { status: 400 });
      }
      
      if (!cardholderName || cardholderName.trim().length < 3) {
        return NextResponse.json({ error: "Invalid cardholder name" }, { status: 400 });
      }
      
      if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
        return NextResponse.json({ error: "Invalid expiry date format (MM/YY required)" }, { status: 400 });
      }
      
      if (!cvc || !cvc.match(/^\d{3,4}$/)) {
        return NextResponse.json({ error: "Invalid CVC code" }, { status: 400 });
      }
      
      // Check if card is expired
      const [expMonth, expYear] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
      const currentMonth = currentDate.getMonth() + 1; // 1-12
      
      if (parseInt(expYear) < currentYear || 
          (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
        return NextResponse.json({ error: "Card is expired" }, { status: 400 });
      }
      
      // Mock card validation - reject specific card numbers for testing
      if (cardNumber.replace(/\s/g, '') === '4111111111111111') {
        // This is a test card number that should always succeed
      } else if (cardNumber.replace(/\s/g, '') === '4242424242424242') {
        // Another test card that should succeed
      } else if (cardNumber.replace(/\s/g, '') === '4000000000000002') {
        // Test card that should be declined
        return NextResponse.json({ error: "Card declined" }, { status: 400 });
      }
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Ensure we have a valid app URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Create order items for the client in the format expected by the order history
    const orderItems = body.items.map((item: any) => ({
      product: {
        id: item.productId,
        name: `Product ${item.productId}`,
        price: calculatePriceWithCustomizations(29.99, item.customization),
        description: "Product description",
        category: "phone-cases",
        image_url: "/images/product-placeholder.jpg",
        stock_quantity: 100
      },
      quantity: item.quantity,
      customization: item.customization
    }));
    
    // Create shipping address from customer info
    const shippingAddress = {
      street: body.customerInfo.address,
      city: body.customerInfo.city,
      state: body.customerInfo.state,
      postal_code: body.customerInfo.postalCode,
      country: body.customerInfo.country
    };
    
    // Create a complete order object with all necessary details
    // This will be returned to the client for saving to localStorage
    const completeOrder = {
      id: orderId,
      userId: userId,
      items: orderItems,
      total: orderTotal,
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shipping_address: shippingAddress,
      payment_method: body.paymentInfo ? 
        `Card ending in ${body.paymentInfo.cardNumber.slice(-4)}` : 'Credit Card'
    };
    
    console.log('Order created:', orderId);

    // Return success response with the complete order object
    return NextResponse.json({ 
      success: true,
      orderId: orderId,
      redirectUrl: `${appUrl}/checkout/success?order_id=${orderId}`,
      order: completeOrder,
      orderSummary: {
        subtotal: totalAmount.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: orderTotal.toFixed(2),
        lineItems: lineItems
      }
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { 
        error: "Failed to create order", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
} 