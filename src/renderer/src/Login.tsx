import logo from './assets/imagens/wheeltrack.png'
import './assets/css/login.css'
import { useState } from 'react'
import { login } from './services/Adm_api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const lidar_login = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      const retorno = await login(email, senha)
      console.log('Sucesso ao logar:', retorno)
      if (retorno && retorno.id_admin) {
        alert('Login bem-sucedido!')
        navigate('/home')
      } else {
        alert('Falha no login: ' + (retorno.mensagem || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Erro ao logar:', error)
    }
  }

  return (
    <div className="tela_login">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>WheelTrack</h1>
      </div>
      <div className="titulo">
        <h1>Bem-vindo</h1>
        <p>Faça login para acessar o sistema WheelTrack</p>
      </div>
      <form className="formulario" onSubmit={lidar_login}>
        <div className="login_senha">
          <h3>LOGIN</h3>
          <input
            type="text"
            placeholder="usuario@wheeltrack.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>SENHA</h3>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="botao_entrar">
          <button>Entrar</button>
          <button>Esqueceu sua senha?</button>
        </div>
      </form>
    </div>
  )
}
