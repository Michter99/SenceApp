import React, { useState, useEffect } from "react";
import firebaseApp from "../../credenciales";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import "./Login.css";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [welcomeQuote, setWelcomeQuote] = useState(
    "Únete a nuestra comunidad de tutores y alumnos"
  );

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then(
        (result) => {
          setWelcomeQuote(result[Math.floor(Math.random() * result.length)]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="main-container" id="container">
      <div className="form-container sign-in-container">
        <form id="login" action="#">
          <img
            src={require("../Assets/SenceLogo.png").default}
            alt="logo"
            className="sence-logo"
          />
          <h1>Sence</h1>
          <h3>Accede con tu cuenta de Google</h3>
          <button onClick={() => signInWithRedirect(auth, googleProvider)}>
            Iniciar sesión
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>¡Bienvenido!</h1>
            <h5>{welcomeQuote.text}</h5>
            <p>- {welcomeQuote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
