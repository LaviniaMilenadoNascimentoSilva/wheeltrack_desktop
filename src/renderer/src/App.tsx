import "./app.css"
import imagem from "./assets/download.jpg"
import Contato from "./contato"
import { Link, Route, Routes } from "react-router-dom"
import { HashRouter } from "react-router-dom"

export default function AQUISÓTEMCABAÇO() {
  return (
   
      <Routes>
        <Route path="/" element={
          <div className="titulo" >
            <h1>AQUI SÓ TEM CABAÇO</h1>
            <img src={imagem} alt="" />
            <p>asdfghjkijuygvbn</p>
            <p>Para saber mais, visite nossa.</p>
            <Link to="/contato">Vá para contato</Link>

          </div>
        } />

        <Route path="/contato" element={<Contato />} />
      </Routes>
    

  )
}