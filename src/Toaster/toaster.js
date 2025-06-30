// toastService.js
import { toast } from "react-toastify";

const toastService = {
  success: (message, options = {}) =>
    toast.success(message, { ...defaultOptions, ...options }),
  error: (message, options = {}) =>
    toast.error(message, { ...defaultOptions, ...options }),
  info: (message, options = {}) =>
    toast.info(message, { ...defaultOptions, ...options }),
  warn: (message, options = {}) =>
    toast.warn(message, { ...defaultOptions, ...options }),
};
const CloseButton = () => (
  <span className="btn-trigger toast-close-button" role="button">
    <span className="cross" />
  </span>
);
// Default options for all toasts
const defaultOptions = {
  position: "top-center",
  autoClose: true,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: false,
  closeButton: <CloseButton />,
  
};

export default toastService;
