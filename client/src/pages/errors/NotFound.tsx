import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-yellow-400 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
    </div>
  );
};

export default NotFoundPage;
