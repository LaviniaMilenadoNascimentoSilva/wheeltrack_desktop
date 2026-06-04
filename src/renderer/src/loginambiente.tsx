import { useState } from 'react'
import './assets/css/loginambiente.css'
import logo from './assets/imagens/wheeltrack.png' // Verifique o caminho da sua logo
import { useNavigate } from 'react-router-dom'

export default function LoginAmbiente() {
  const [ambiente, setAmbiente] = useState('')
  const navigate = useNavigate()

  const ambientes = [
    { id: 'funcionarios', nome: 'Funcionários', icone: '👥' },
    { id: 'clientes', nome: 'Clientes', icone: '📇' },
    { id: 'veiculos', nome: 'Veículos', icone: '🚗' },
    { id: 'blindagem', nome: 'Blindagem', icone: '🛡️' },
    { id: 'manutencao', nome: 'Manutenção', icone: '🔧' },
    { id: 'documentos', nome: 'Documentos', icone: '📄' }
  ]

  return (
    <div className="login-externo">
      <div className="login-logo-topo">
        <img src={logo} alt="WheelTrack Logo" />
        <span className="logo-texto">
          Wheel<span className="verde">Track</span>
        </span>
      </div>
      <p className="subtitulo-login">Selecione a empresa, filial e ambiente de acesso</p>

      <div className="card-acesso">
        <h2 className="titulo-acesso">ACESSO AO SISTEMA</h2>

        <div className="campo-login">
          <label>EMPRESA</label>
          <select className="select-login">
            <option>WheelTrack Blindagens LTDA</option>
          </select>
        </div>

        <div className="campo-login">
          <label>FILIAL</label>
          <select className="select-login">
            <option>Filial 01 — São Paulo / SP</option>
          </select>
        </div>

        <div className="ambiente-secao">
          <label>AMBIENTE</label>
          <div className="grid-ambientes">
            {ambientes.map((item) => (
              <button
                key={item.id}
                className={`btn-ambiente ${ambiente === item.id ? 'ativo' : ''}`}
                onClick={() => setAmbiente(item.id)}
              >
                <span className="ambiente-icone">{item.icone}</span>
                {item.nome}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-acessar-principal" onClick={() => navigate('/home')}>Acessar</button>
      </div>
    </div>
  )
}
