import React, { useState, useEffect } from "react";
import firebaseApp from "../../credenciales";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ListadoTutores from "./ListadoTutores";

const firestore = getFirestore(firebaseApp);

const Tutores = ({ correoUsuario }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filterCondition, setFilterCondition] = useState("Ninguno");

  useEffect(() => {
    async function getTutores() {
      const querySnapshot = await getDocs(collection(firestore, "usuarios"));
      setUsuarios(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    getTutores();
  }, []);

  const filterTut = usuarios.filter(
    (tutor) => tutor.userInfo.tutor && tutor.userInfo.email !== correoUsuario
  );

  const filterTutUni = usuarios.filter(
    (tutor) =>
      tutor.userInfo.tutor &&
      tutor.userInfo.email !== correoUsuario &&
      "Universidad" === tutor.userInfo.studies
  );

  const filterTutPrep = usuarios.filter(
    (tutor) =>
      tutor.userInfo.tutor &&
      tutor.userInfo.email !== correoUsuario &&
      "Preparatoria" === tutor.userInfo.studies
  );

  const filterTutSec = usuarios.filter(
    (tutor) =>
      tutor.userInfo.tutor &&
      tutor.userInfo.email !== correoUsuario &&
      "Secundaria" === tutor.userInfo.studies
  );

  return (
    <div>
      <div className="profile-page">
        <h1 className="m-4 main-title">Tutores</h1>
        <div className="container mb-5 listTutSt">
          <div className="col-sm-3 filter-form">
            <label htmlFor="filter" className="form-label">
              Filtro
            </label>
            <select
              className="form-select"
              id="filter"
              defaultValue="Ninguno"
              onChange={(e) => {
                setFilterCondition(e.target.value);
              }}
            >
              <option>Ninguno</option>
              <option>Universidad</option>
              <option>Preparatoria</option>
              <option>Secundaria</option>
            </select>
          </div>
          <div className="row">
            {filterCondition === "Ninguno" &&
              filterTut.map((tutor) => (
                <ListadoTutores key={tutor.id} tutorInfo={tutor.userInfo} />
              ))}
            {filterCondition === "Universidad" &&
              filterTutUni.map((tutor) => (
                <ListadoTutores key={tutor.id} tutorInfo={tutor.userInfo} />
              ))}
            {filterCondition === "Preparatoria" &&
              filterTutPrep.map((tutor) => (
                <ListadoTutores key={tutor.id} tutorInfo={tutor.userInfo} />
              ))}
            {filterCondition === "Secundaria" &&
              filterTutSec.map((tutor) => (
                <ListadoTutores key={tutor.id} tutorInfo={tutor.userInfo} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutores;
