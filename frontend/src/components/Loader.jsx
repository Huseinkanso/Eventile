import React from "react";

const Loader = () => {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
};

export default Loader;
