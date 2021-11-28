import React from "react";
import TutorStdCard from "./TutorStdCard";

const ListadoTutSt = ({ tutoresAlumnosInfo, eliminarTutSt }) => {
  return (
    <div className="container mb-5 listTutSt">
      <div className="row">
        {tutoresAlumnosInfo.map((tutor) => (
          <TutorStdCard
            key={tutoresAlumnosInfo.indexOf(tutor)}
            tutorEstudiante={tutor}
            eliminarTutSt={eliminarTutSt}
          />
        ))}
      </div>
    </div>
  );
};

export default ListadoTutSt;
