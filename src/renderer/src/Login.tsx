import logo from './assets/imagens/wheeltrack.png'
import './assets/css/login.css'

export default function Login() {
return  (
  <div className="tela_login">
    <div className="logo">
      <img src={logo} alt="Logo" />
      <h1>WheelTrack</h1>
    </div>
    <div className="titulo">
      <h1>Bem-vindo</h1>
      <p>Faça login para acessar o sistema WheelTrack</p>
    </div>
    <div className="login_senha">
      <h3>LOGIN</h3>
      <input type="text" placeholder='usuario@wheeltrack.com.br' />
      <h3>SENHA</h3>
      <input type="password" placeholder='Digite sua senha' />
    </div>
    <div className="botao_entrar">
      <button>Entrar</button>
      <button>Esqueci minha senha</button>
    </div>
  </div>
)
}