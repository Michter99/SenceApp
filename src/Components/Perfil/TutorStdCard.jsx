import React from "react";

const TutorStdCard = ({ tutorEstudiante, eliminarTutSt }) => {
  return (
    <div className="card col-lg-4 mt-4">
      <div className="card-body">
        <h4 className="card-title">{tutorEstudiante.name}</h4>
        <h5 className="card-subtitle mb-2 text-muted">
          {tutorEstudiante.tutor ? "Tutor" : "Alumno"}
        </h5>
        <p className="card-text">{tutorEstudiante.studies}</p>
        <p className="card-text">{tutorEstudiante.email}</p>
        <p className="card-text">{tutorEstudiante.tel}</p>
        <button
          onClick={() => eliminarTutSt(tutorEstudiante, tutorEstudiante.tutor)}
          className="btn btn-outline-danger"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TutorStdCard;
