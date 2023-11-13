import React, { useState } from "react";

import { byId } from "../../Service/Tournament";
import Detail from "./Components/Detail";
import Participants from "./Components/Participants";
import Contact from "./Components/Contact";
const options = [ "Detalhe", "Participantes", "Contatos" ];
const TournamentDetail = () => {
  const [ data, setData ] = useState([]);
  const [ tab, setTab ] = useState("Detalhe");
  const getTournamentById = async (id) => {
    try {
      let req = await byId(id);
      setData({ data: req.data[0], user: req.user[0] });
      //  console.log("dele", data);
    } catch (e) {
      console.log("e", e);
    }
  };

  React.useEffect(() => {
    let param = window.location.pathname.split("/")[2];
    getTournamentById(param);
  }, []);
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      {data &&
      data.data && (
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {options.map((value) => (
              <li
                class="me-2"
                onClick={() => {
                  setTab(value);
                }}
              >
                <a
                  href="#"
                  aria-current="page"
                  class={`
                inline-block p-4 ${value === tab
                  ? "text-blue-600"
                  : ""} bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500
                `}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
          <div>{tab === "Detalhe" && <Detail data={data.data} />}</div>
          <div>
            {tab === "Participantes" && <Participants data={data.data} />}
          </div>
          <div>{tab === "Contatos" && <Contact data={data.user} />}</div>
        </div>
      )}
    </div>
  );
};

export default TournamentDetail;
