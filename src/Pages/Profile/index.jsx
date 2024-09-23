import React, { useState } from "react";

import { getUserTournament } from "../../Service/Tournament";
import Events from "./Components/Events";
import { useNavigate } from "react-router-dom";

const options = [ "Eventos", "Ajustes", "Contatos" ];
const Profile = () => {
  const [ data, setData ] = useState([]);
  const [ tab, setTab ] = useState("Eventos");
  const navigate = useNavigate();
  const getUserTorunaments = async () => {
    try {
      let req = await getUserTournament(1);
      setData(req.data);
    } catch (e) {
      console.log("e", e);
    }
  };

  React.useEffect(() => {
    getUserTorunaments();
  }, []);
  return (
    <div className="w-100 p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      <h1 className="title">
        Bem vindo {data && data.user && <p>{data.user.name}</p>}
      </h1>
      <div className="flex flex-col w-[80%]">
        <div className="bg-[#eeeeee] h-[80px] w-full  flex gap-10 items-center">
          {options.map((value, key) => (
            <p
              key={key}
              className="me-2"
              onClick={() => {
                setTab(value);
              }}
            >
              <a
                href="#"
                aria-current="page"
                className={`
                inline-block p-4 ${
                  value === tab
                    ? "text-white bg-blue-300"
                    : "  rounded-t-lg active "
                }
                `}
              >
                {value}
              </a>
            </p>
          ))}
        </div>
      </div>
      <div className="w-[80%]">
        {tab === "Eventos" && <Events data={data} />}
      </div>
    </div>
  );
};

export default Profile;
