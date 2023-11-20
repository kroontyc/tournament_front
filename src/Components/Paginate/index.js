import React from "react";

const Paginate = ({ data, click }) => {
  const [ page, setPage ] = React.useState(1);
  const numbers = Array.from({ length: data.last_page }, (_, i) => i + 1);
  return (
    <nav aria-label="Page navigation example" className="w-full h-full">
      <ul class="flex items-center  justify-center  w-full h-full h-10  m-auto">
        {numbers.map((val) => val < 16 &&(
          <li
           className="cursor-pointer"
            onClick={(event) => {
              click(val);
            }}
          >
            <a
              value={val}
              className={
                data.current_page == val ? (
                  "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-blue-500 bg-blue-500 text-yellow-400 border  border-gray-300  hover:bg-gray-100 hover:text-gray-700"
                ) : (
                  "flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  border-gray-300  hover:bg-gray-100 hover:text-gray-700"
                )
              }
            >
              {val}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
