import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseApp from "../../credenciales";
import UserInfo from "./UserInfo";
import ListadoTutSt from "./ListadoTutSt";
import "./Perfil.css";

const firestore = getFirestore(firebaseApp);
const auth = getAuth();

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [filterCondition, setFilterCondition] = useState("Ninguno");

  useEffect(() => {
    async function getOrCreateUser() {
      const userRef = doc(firestore, "usuarios", auth.currentUser.email);
      let userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      } else {
        await setDoc(userRef, {
          tutSt: [],
          userInfo: {
            email: auth.currentUser.email,
            name: "Tu nombre",
            studies: "Tu nivel de estudios",
            tel: "Tu teléfono",
            tutor: false,
          },
        });
        userSnap = await getDoc(userRef);
        setUser(userSnap.data());
      }
    }
    getOrCreateUser();
  }, []);

  async function eliminarTutSt(tutorEstudianteAEliminar, isTutor) {
    // Eliminar de cuenta activa
    const docuRef = doc(firestore, "usuarios", auth.currentUser.email);

    await updateDoc(docuRef, {
      tutSt: arrayRemove(tutorEstudianteAEliminar),
    });

    const userRef = doc(firestore, "usuarios", auth.currentUser.email);
    let userSnap = await getDoc(userRef);
    setUser(userSnap.data());

    // Eliminar de cuenta inactiva
    const otherDocuRef = doc(
      firestore,
      "usuarios",
      tutorEstudianteAEliminar.email
    );
    const otherUserInfo = Object.assign(user.userInfo, {
      id: auth.currentUser.email,
      tutor: !isTutor,
    });
    await updateDoc(otherDocuRef, {
      tutSt: arrayRemove(otherUserInfo),
    });
  }

  return (
    <div className="profile-page">
      <h1 className="main-title m-4">Perfil</h1>
      {user && <UserInfo userInformation={user.userInfo} />}
      <h3 className="section-heading1">Mis alumnos y mis tutores</h3>
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
          <option>Alumnos</option>
          <option>Tutores</option>
        </select>
      </div>
      {user && filterCondition === "Ninguno" && (
        <ListadoTutSt
          tutoresAlumnosInfo={user.tutSt}
          eliminarTutSt={eliminarTutSt}
        />
      )}
      {user && filterCondition === "Alumnos" && (
        <ListadoTutSt
          tutoresAlumnosInfo={user.tutSt.filter(
            (usuarioTutor) => !usuarioTutor.tutor
          )}
          eliminarTutSt={eliminarTutSt}
        />
      )}
      {user && filterCondition === "Tutores" && (
        <ListadoTutSt
          tutoresAlumnosInfo={user.tutSt.filter(
            (usuarioTutor) => usuarioTutor.tutor
          )}
          eliminarTutSt={eliminarTutSt}
        />
      )}
    </div>
  );
};

export default Perfil;
