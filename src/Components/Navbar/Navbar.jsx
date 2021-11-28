import React, { Component } from "react";
import firebaseApp from "../../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Navbar.css"

const auth = getAuth(firebaseApp);

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container-fluid">
                    <img src={require("../Assets/SenceLogo.png").default} alt="logo" className="nav-logo" />
                    <p className="navbar-brand" href="../index.html">Sence</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/">
                                <p className="nav-link active">Perfil</p>
                            </Link>
                            <Link to="/Tutores">
                                <p className="nav-link active">Tutores</p>
                            </Link>
                            <button className="btn btn-outline-primary" onClick={() => signOut(auth)}>Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
