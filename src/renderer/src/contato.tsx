import "./contato.css"
import imagem from "./assets/wheeltrack02.png"
import App from "./App";
import { HashRouter, Link, Route, Routes } from "react-router-dom";

export default function Contato() {
    return (
        <div className="titulo">
            <h1>CONTATO</h1>
            <img src={imagem} alt="Wheeltrack" />
            <Link to="/" >Voltar</Link>
        </div>


    )
}


