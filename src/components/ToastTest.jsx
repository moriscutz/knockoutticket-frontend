import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ToastTest = () => {
  const handleSuccessToast = () => {
    toast('This is a success message!');
  };


  const handleErrorToast = () => {
    toast('This is an error message!');
  };

  const handleInfoToast = () => {
    toast('This is an info message!');
  };

  return (
    <div>
      <button onClick={handleSuccessToast}>Show Success Toast</button>
      <button onClick={handleErrorToast}>Show Error Toast</button>
      <button onClick={handleInfoToast}>Show Info Toast</button>
      <ToastContainer />
    </div>
  );
};

export default ToastTest;
