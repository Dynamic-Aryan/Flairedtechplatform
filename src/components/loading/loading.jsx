import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loading;
