import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import firebaseApp from "../../credenciales";

const auth = getAuth();
const firestore = getFirestore(firebaseApp);

const ListadoTutores = ({ tutorInfo }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const userRef = doc(firestore, "usuarios", auth.currentUser.email);
      const docSnap = await getDoc(userRef);
      setUser(docSnap.data());
    }
    getUserInfo();
  }, []);

  async function addTutor() {
    const userRef = doc(firestore, "usuarios", auth.currentUser.email);
    const tutorToAdd = {
      id: tutorInfo.email,
      tutor: tutorInfo.tutor,
      name: tutorInfo.name,
      studies: tutorInfo.studies,
      email: tutorInfo.email,
      tel: tutorInfo.tel,
    };
    await updateDoc(userRef, {
      tutSt: arrayUnion(tutorToAdd),
    });

    const tutorRef = doc(firestore, "usuarios", tutorInfo.email);
    const studentToAdd = {
      id: user.userInfo.email,
      tutor: false,
      name: user.userInfo.name,
      studies: user.userInfo.studies,
      email: user.userInfo.email,
      tel: user.userInfo.tel,
    };
    await updateDoc(tutorRef, {
      tutSt: arrayUnion(studentToAdd),
    });
  }

  return (
    <div className="card col-lg-4 mt-4">
      <div className="card-body">
        <h4 className="card-title">{tutorInfo.name}</h4>
        <h5 className="card-subtitle mb-2 text-muted">{tutorInfo.tutor}</h5>
        <p className="card-text">{tutorInfo.studies}</p>
        <p className="card-text">{tutorInfo.email}</p>
        <p className="card-text">{tutorInfo.tel}</p>
        <button onClick={addTutor} className="btn btn-outline-primary">
          Agregar tutor
        </button>
      </div>
    </div>
  );
};

export default ListadoTutores;
