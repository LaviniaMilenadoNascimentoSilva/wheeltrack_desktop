import './assets/css/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login'
import LoginAmbiente from './loginambiente'
import Inicio from './inicio'
import Cadastro_funcionario from './cadastro_funcionario'
import Funcionarios from './funcionarios'
import Clientes from './clientes'
import Veiculos from './veiculo'
import Blindagem from './blindagem'
import Manutencao from './manutencao'
import Documentos from './documento'
import Configuracoes from './configuracoes'

import { HashRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Inicio />} />
        <Route path="/login-ambiente" element={<LoginAmbiente />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/veiculos" element={<Veiculos />} />
        <Route path="/blindagem" element={<Blindagem />} />
        <Route path="/manutencao" element={<Manutencao />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/cadastro_funcionario" element={<Cadastro_funcionario />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
