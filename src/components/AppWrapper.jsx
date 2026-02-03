import React from "react";

const AppWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {children}
    </div>
  );
};

export default AppWrapper;
