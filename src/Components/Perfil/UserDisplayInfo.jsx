import React from "react";

function UserDisplayInfo({ userInformation, editarInfo }) {
  const TutorInfo = () => {
    if (userInformation.tutor) {
      return <h5 className="card-subtitle mt-3">Usted es tutor</h5>;
    } else {
      return <h5 className="card-subtitle mt-3">Usted no es tutor</h5>;
    }
  };

  return (
    <div className="card text-center border-dark mb-5">
      <div className="card-body">
        <h3 className="card-title">Mi información</h3>
        <p className="card-text mt-3">Nombre completo</p>
        <h5 className="card-subtitle">{userInformation.name}</h5>
        <p className="card-text mt-3">Nivel de estudios</p>
        <h5 className="card-subtitle">{userInformation.studies}</h5>
        <p className="card-text mt-3">Correo registrado</p>
        <h5 className="card-subtitle">{userInformation.email}</h5>
        <p className="card-text mt-3">Teléfono</p>
        <h5 className="card-subtitle">{userInformation.tel}</h5>
        <TutorInfo />
        <button onClick={editarInfo} className="btn btn-primary mt-3">
          Editar
        </button>
      </div>
    </div>
  );
}

export default UserDisplayInfo;
