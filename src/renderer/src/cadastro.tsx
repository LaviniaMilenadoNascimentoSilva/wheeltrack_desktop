import { cadastro } from './services/Adm_api'
import { useState } from 'react'
import MenuLateral from './menuLateral'

export default function Cadastro() {
  const [nome_admin, setNome_admin] = useState('')
  const [email_admin, setEmail_admin] = useState('')
  const [senha_admin, setSenha_admin] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  const lidarCadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)
    if (!nome_admin.trim() || !email_admin.trim() || !senha_admin.trim() || !cnpj.trim()) {
      setErro('Por favor, preencha todos os campos antes de continuar.')
      setTimeout(() => setErro(null), 4000)
      return
    }
    try {
      const resposta = await cadastro(nome_admin, email_admin, senha_admin, cnpj)
      console.log('Sucesso ao cadastrar:', resposta)
      if (resposta.sucesso) {
        setErro('cadastro bem-sucedido!')
        setTimeout(() => setErro(null), 4000)
      } else {
        setErro(resposta.mensagem)
        setTimeout(() => setErro(null), 4000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      setErro('Ocorreu um erro ao tentar cadastrar. Pro favor, tente novamente mais tarde.')
      setTimeout(() => setErro(null), 4000)
    }
  }
  return (
    <div className="tela-inteira">
      <MenuLateral />
      <div>
        <h1>Cadastro do admin</h1>
        <form onSubmit={lidarCadastro}>
          <input
            type="text"
            placeholder="Nome do Admin"
            value={nome_admin}
            onChange={(e) => setNome_admin(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email do Admin"
            value={email_admin}
            onChange={(e) => setEmail_admin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha do Admin"
            value={senha_admin}
            onChange={(e) => setSenha_admin(e.target.value)}
          />
          <input
            type="text"
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
