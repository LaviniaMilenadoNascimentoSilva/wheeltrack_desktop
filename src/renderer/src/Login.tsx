import logo from './assets/imagens/wheeltrack.png'
import './assets/css/login.css'
import { useState } from 'react'
import { login } from './services/Adm_api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const navigate = useNavigate()

  const lidar_login = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)

    if (!email.trim() || !senha.trim()) {
      setErro('Por favor, preencha todos os campos antes de continuar.')
      setTimeout(() => setErro(null), 4000)
      return
    }

    try {
      const resposta = await login(email, senha)
      console.log('Sucesso ao logar:', resposta)
      if (resposta.sucesso) {
        setErro('Login bem-sucedido!')

        // Garanta que está puxando a propriedade 'nome_admin' em minúsculo
        if (resposta.admin) {
          localStorage.setItem('operador_nome', resposta.admin.nome_admin)
          localStorage.setItem('operador_id', resposta.admin.id_admin.toString())
        }

        setTimeout(() => {
          setErro(null)
          navigate('/login-ambiente')
        }, 2000)
      } else {
        setErro(resposta.mensagem)
        setTimeout(() => setErro(null), 4000)
      }
    } catch (error) {
      console.error('Erro ao logar:', error)
      setErro('Ocorreu um erro ao tentar logar. Por favor, tente novamente mais tarde.')
      setTimeout(() => setErro(null), 4000)
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
      {erro && <div className="mensagem_erro">{erro}</div>}
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
          <button type="submit" className="botao_login">
            Entrar
          </button>
          <button className="botao_login">Esqueceu sua senha?</button>
        </div>
      </form>
    </div>
  )
}
