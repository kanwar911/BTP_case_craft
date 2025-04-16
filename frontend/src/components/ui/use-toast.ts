// Export toast from sonner and provide a compatible useToast interface
import { toast } from 'sonner';

// Create a compatibility layer for useToast
export function useToast() {
  return {
    toast: toast
  };
}

// Re-export toast directly for simpler usage
export { toast }; 