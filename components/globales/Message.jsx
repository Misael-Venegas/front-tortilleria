import React from "react";

const Message = ({ msg, bgColor }) => {


  return (
    <div className="alert alert-danger" role="alert">
      <p>{msg}</p>
    </div>
  );
};

export default Message;
