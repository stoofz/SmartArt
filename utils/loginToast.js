import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginToast from '@/components/LoginToast';

export const showLoginToast = (textToast) => {
  // toast.success(textToast, {
    toast.success(<LoginToast text={textToast} />, {
    progressStyle: {
      backgroundColor: '#b1889d', // Set the progress bar color

    },
    position: 'top-right',
    autoClose: 2000,
    style: {
      backgroundColor: '#F5C9C6', // Background color
      color: 'black', // Text color

    },
    icon: () => null,
  });
};