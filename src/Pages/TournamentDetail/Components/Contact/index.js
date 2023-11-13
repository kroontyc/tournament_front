import React, { useState } from "react";

const Contact = ({ data }) => {
  console.log("data", data);
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      {data && (
        <div>
          <div className="mt-5">
            <p className="sub-title">
              Email : <span className="ml-4"> {data.email}</span>
            </p>
            <p className="sub-title">
              Responsável : <span className="ml-4"> {data.name}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
