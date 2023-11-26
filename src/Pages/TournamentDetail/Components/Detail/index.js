import React, { useState } from "react";

const Detail = ({ data }) => {
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      {data && (
        <div>
          <h1 className="title">{data.name}</h1>
          <p>{data.federation}</p>
          <div className="mt-5">
            <p className="sub-title">
              Data : <span className="ml-4"> {data.data}</span>
            </p>
            <p className="sub-title">
              Premição : <span className="ml-4"> {data.reward}</span>
            </p>
            <p className="sub-title">
              Local : <span className="ml-4"> {data.location}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
