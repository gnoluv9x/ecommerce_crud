import React from "react";
import Spin from "react-cssfx-loading/lib/Spin";

const Spinner = () => {
  return (
    <div className="h-100 flex justify-center items-center">
      <Spin className="mx-auto" color="#0d6efd" width="60px" height="60px" />
    </div>
  );
};

export default Spinner;
