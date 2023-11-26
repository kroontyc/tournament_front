import React, { useState } from "react";
import "./style.css";
import { byId } from "../../Service/Tournament";
import Detail from "./Components/Detail";
import Participants from "./Components/Participants";
import Contact from "./Components/Contact";
import { Link } from "react-router-dom";
import Arenas from "./Components/Arenas";
const options = [ "Detalhe", "Participantes", "Lutas", "Arenas" ];

const TournamentDetail = () => {
  const [ data, setData ] = useState([]);
  const [ tab, setTab ] = useState("Detalhe");
  const [ currentDate, setCurrentDate ] = useState("");
  const [ id, setId ] = useState("");
  const getTournamentById = async (id) => {
    try {
      setId(id);
      let req = await byId(id);
      setData({ data: req.data[0], user: req.user[0] });
      let date = formatCreatedAt(req.data[0].created_at);
      setCurrentDate(date);
    } catch (e) {
      console.log("e", e);
    }
  };

  const formatCreatedAt = (timestamp) => {
    const date = new Date(timestamp);
    // Format the date as per the requirement "DD/MM/YYYY as HH:MM"
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
      .replace(/,/, " às"); // Replace comma with 'às'
  };

  React.useEffect(() => {
    let param = window.location.pathname.split("/")[2];
    getTournamentById(param);
  }, []);
  return (
    <div className="w-80% m-auto p-[14px] items-center justify-center mt-[40px] h-100 flex flex-col">
      <div className="w-full">
        {data &&
        data.data && (
          <div className="general-info w-full p-5 banner">
            <h1
              className="title text-white"
              style={{ backdropFilter: "blur(10px)" }}
            >
              {data.data.name}
            </h1>
            <div className="mt-10 flex items-center justify-center  w-full gap-20">
              <p
                className="text-white"
                style={{ backdropFilter: "blur(10px)" }}
              >
                {data.data.data}
              </p>
              <p
                className="text-white"
                style={{ backdropFilter: "blur(10px)" }}
              >
                {data.data.federation}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#eeeeee] h-[80px] w-full mb-10 flex gap-10 items-center">
        {options.map((value) => (
          <p
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
                  ? "text-white bg-blue-300"
                  : "  rounded-t-lg active "}
                `}
            >
              {value}
            </a>
          </p>
        ))}
      </div>
      {tab === "Detalhe" && (
        <div className="flex gap-10 w-full m-auto">
          <div className="flex flex-col w-[40%]">
            <div className="register-container flex items-center flex-col justify-center gap-5">
              <button className="btn-def">
                <Link to={`/tournament/edit/${id}`}>
                  Registrar participantes
                </Link>
              </button>
              <button className="btn-def">
                <Link to={`/tournament/edit/${id}`}>Atualizar Chaves</Link>
              </button>
            </div>
            {data &&
            data.user && (
              <div className="mt-[30px] hosted-by">
                <p>Criado por:</p>
                <p>{data.user.name}</p>
                <p>{data.user.email}</p>
                <p>{data.data.ferederation}</p>
                <p>{currentDate}</p>
              </div>
            )}
          </div>
          <div className="flex w-[60%] general-info">
            {data &&
            data.data && (
              <div className="w-full p-8">
                <h1 className="title">Informações gerais</h1>
                <div className="initial">
                  <p>
                    Este evento foi criado dia {currentDate} por{" "}
                    {data.user.name} com uma recompensa declarada de{" "}
                    {data.data.reward} e deve acontecer no local{" "}
                    {data.data.location} realizado pela Federação:{" "}
                    {data.data.ferederation}
                  </p>
                  <p className="mt-10 title-card">Regulamentos da federação</p>
                  <p className="mt-2 title-card">Regras da rank</p>
                  <p className="mt-2 title-card">Premiações</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div>{tab === "Participantes" && <Participants data={data.data} />}</div>
      <div className="w-full">
        {tab === "Lutas" && <Contact data={data.data} />}
      </div>
      <div className="w-full">{tab === "Arenas" && <Arenas data={data} />}</div>
    </div>
  );
};

export default TournamentDetail;
