import React, { useRef, useState } from "react";
import TournamentBracket from "./TournamentBracket";
import html2pdf from "html2pdf.js";

const options = {
  filename: "brackets-document.pdf",
  margin: [0.1, 0.1], // Margens menores
  image: { type: "jpeg", quality: 1 }, // Qualidade máxima
  html2canvas: {
    scale: 2, // Aumenta a escala para melhorar a qualidade

  },
  jsPDF: { unit: "in", format: "a4", orientation: "landscape" }, // Formato maior (A3) e paisagem
};

const BracketContainer = ({ groups, setGroups, currentScores, isView }) => {
  const contentRef = useRef(null);
  const [showEdit, setShowEdit] = useState(false);
  const convertToPdf = () => {
    const content = contentRef.current;
    setShowEdit(true)
    html2pdf()
      .set(options)
      .from(content)
      .save()
      .catch((error) => console.error("Erro ao gerar PDF:", error));
      setShowEdit(false)
  };

  return (
    <div className="bracket-container">
      <div className="w-full items-end flex justify-end pr-4">
        <button
          className="transform text-[15px] p-2 bg-blue-500 text-white rounded flex items-center gap-2"
          onClick={convertToPdf}
        >
          <span className="material-symbols-outlined">print</span>
          Imprimir
        </button>
      </div>
      <div ref={contentRef}>
        {groups.map((group, index) => (
          <TournamentBracket
            key={index}
            group={group}
            setGroups={setGroups}
            currentScores={currentScores}
            isView={showEdit ? true : isView}
          />
        ))}
      </div>
    </div>
  );
};

export default BracketContainer;
