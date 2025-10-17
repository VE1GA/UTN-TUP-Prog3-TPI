import { toast, Slide } from "react-toastify";

export const useToast = () => {
  const baseConfig = {
    position: "top-center",
    autoClose: 2500,
    theme: "dark",
    transition: Slide,
  };

  const showSuccessToast = (message, options = {}) => {
    toast.success(message, { ...baseConfig, ...options });
  };

  const showErrorToast = (message, options = {}) => {
    toast.error(message, { ...baseConfig, ...options });
  };

  const showInfoToast = (message, options = {}) => {
    toast.info(message, { ...baseConfig, ...options });
  };

  return { showSuccessToast, showErrorToast, showInfoToast };
};
