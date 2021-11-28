import React, { useState, useRef } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseApp from "../../credenciales";
import UserDisplayInfo from "./UserDisplayInfo";
import "./Perfil.css";

const firestore = getFirestore(firebaseApp);

function UserInfo({ userInformation }) {
  const [formActive, setFormActive] = useState(false);
  let userName = useRef(userInformation.name);
  let userStudies = useRef(userInformation.studies);
  let userTel = useRef(userInformation.tel);
  let userIsTutor = useRef(userInformation.tutor);
  // const submitForm;

  function changeActiveForm() {
    setFormActive(!formActive);
  }

  async function editarPerfil(e) {
    const nombreVal = userName.current.value;
    const estudios = userStudies.current.value;
    const telefono = userTel.current.value;
    const tutorVal = userIsTutor.current.value;
    const emailUser = userInformation.email;
    const userInfoRef = doc(firestore, "usuarios", emailUser);

    console.log(tutorVal);

    setFormActive(false);

    await updateDoc(userInfoRef, {
      "userInfo.name": nombreVal,
      "userInfo.studies": estudios,
      "userInfo.tel": telefono,
      "userInfo.tutor": tutorVal === "Sí" ? true : false,
      "userInfo.email": emailUser,
    });

    window.location.reload();
  }

  if (formActive) {
    return (
      <div className="card card-info mb-5">
        <div className="card-body">
          <form
            className="row g-3 needs-validation"
            id="submit-form"
            onSubmit={editarPerfil}
          >
            <div className="col-md-6">
              <label htmlFor="name-input" className="form-label">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="name-input"
                required
                ref={userName}
                defaultValue={userInformation.name}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom03" className="form-label">
                Nivel de estudios
              </label>
              <select
                className="form-select"
                id="validationCustom03"
                required
                ref={userStudies}
                defaultValue={userInformation.studies}
              >
                <option disabled>Choose...</option>
                <option>Universidad</option>
                <option>Preparatoria</option>
                <option>Secundaria</option>
              </select>
            </div>
            <div className="col-md-6">
              <label
                htmlFor="validationCustom04"
                className="form-label"
                disabled
              >
                Correo
              </label>
              <input
                type="email"
                className="form-control"
                id="validationCustom04"
                required
                disabled
                defaultValue={userInformation.email}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom05" className="form-label">
                Teléfono
              </label>
              <input
                type="tel"
                className="form-control"
                id="validationCustom05"
                required
                ref={userTel}
                defaultValue={userInformation.tel}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="tutorField" className="form-label">
                ¿Desea ser tutor?
              </label>
              <select
                className="form-select"
                id="tutorField"
                required
                ref={userIsTutor}
                defaultValue={userInformation.tutor ? "Sí" : "No"}
              >
                <option disabled>Choose...</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
            <div className="col-12">
              <button className="btn btn-primary mt-2" type="submit">
                Confirmar
              </button>
            </div>
          </form>

          <div className="col-12">
            <button
              className="btn btn-danger mt-2"
              onClick={() => {
                setFormActive(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <UserDisplayInfo
        userInformation={userInformation}
        editarInfo={changeActiveForm}
      />
    );
  }
}

export default UserInfo;
