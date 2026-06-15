import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

export function showToast(type: ToastType, title: string, desc?: string) {
  const options = desc ? { description: desc } : {};

  switch (type) {
    case "success":
      toast.success(title, options);
      break;
    case "error":
      toast.error(title, options);
      break;
    case "info":
      toast.info(title, options);
      break;
    case "warning":
      toast.warning(title, options);
      break;
  }
}

export function showPromiseToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) {
  return toast.promise(promise, messages);
}