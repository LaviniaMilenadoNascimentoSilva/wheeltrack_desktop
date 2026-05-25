import React, { useState, useEffect } from 'react'
import './assets/css/funcionarios.css' // Importação vital para o estilo funcionar
import MenuLateral from './menuLateral'
import { Listar } from './services/funcionario_api'
import { Funcionario_cadastro } from './services/Adm_api'

export default function Funcionarios() {
  const [aba, setAba] = useState('lista')
  const [busca, setBusca] = useState('')
  const [funcionarios, setFuncionarios] = useState<any[]>([])

  useEffect(() => {
    Listar().then((dados) => {
      setFuncionarios(dados)
    })
  }, [])

  const [nome_funcionario, setNome_funcionario] = useState('')
  const [email, setEmail] = useState('')
  const [cargo, setCargo] = useState('')
  const [senha_funcionario, setSenha_funcionario] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  const lidarCadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)

    if (!nome_funcionario.trim() || !email.trim() || !cargo.trim() || !senha_funcionario.trim()) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
      return
    }
    try {
      const resposta = await Funcionario_cadastro(nome_funcionario, email, cargo, senha_funcionario)
      console.log('Sucesso ao cadastrar: ', resposta)
      if (resposta.sucesso) {
        setErro('Cadastro bem-sucedido!')
        setTimeout(() => setErro(null), 3000)
      } else {
        setErro(resposta.mensagem)
        setTimeout(() => setErro(null), 3000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      setErro('Erro ao cadastrar funcionário.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  return (
    <div className="tela-inteira">
      <MenuLateral />
      <div className="pagina">
        <header className="cabecalho">
          <div>
            <h1 className="cabecalho-titulo">Funcionários</h1>
            <p className="cabecalho-subtitulo">Gestão de colaboradores cadastrados</p>
          </div>
          <button className="btn-primario" onClick={() => setAba('cadastro')}>
            + Novo Funcionário
          </button>
        </header>

        <nav className="abas">
          <button
            className={`aba ${aba === 'lista' ? 'aba-ativa' : ''}`}
            onClick={() => setAba('lista')}
          >
            Lista de Funcionários
          </button>
          <button
            className={`aba ${aba === 'cadastro' ? 'aba-ativa' : ''}`}
            onClick={() => setAba('cadastro')}
          >
            Cadastro
          </button>
        </nav>

        {aba === 'lista' ? (
          <>
            <div className="grid-3">
              <div className="card-total">
                <div className="card-total-icone verde">👥</div>
                <div className="card-total-numero">{funcionarios.length}</div>
                <div className="card-total-texto">Total</div>
              </div>
              {/*<div className="card-total">
                <div className="card-total-icone verde">✅</div>
                <div className="card-total-numero">
                  {funcionarios.filter((f) => f.status === 'Ativo').length}
                </div>
                <div className="card-total-texto">Ativos</div>
              </div>
              <div className="card-total">
                <div className="card-total-icone vermelho">❌</div>
                <div className="card-total-numero">
                  {funcionarios.filter((f) => f.status === 'Inativo').length}
                </div>
                <div className="card-total-texto">Inativos</div>
              </div>*/}
            </div>

            <div className="barra-busca-row">
              <input
                className="input-busca"
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className="tabela-container">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>NOME</th>
                    <th>email</th>
                    <th>CARGO</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((funcionario) => (
                    <tr key={funcionario.id}>
                      <td>{funcionario.nome_funcionario}</td>
                      <td>{funcionario.email}</td>
                      <td>{funcionario.cargo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="formulario-simples">
            {erro && <div className="mensagem_erro">{erro}</div>}
            {/* Conteúdo do formulário viria aqui */}
            <form onSubmit={lidarCadastro}>
              <h3>Nome</h3>
              <input
                type="text"
                placeholder="Nome completo"
                value={nome_funcionario}
                onChange={(e) => setNome_funcionario(e.target.value)}
              />
              <h3>Email</h3>
              <input
                type="email"
                placeholder="email@whelltrack.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h3>Cargo</h3>
              <input
                type="text"
                placeholder="Cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />
              <h3>Senha</h3>
              <input
                type="password"
                placeholder="Senha"
                value={senha_funcionario}
                onChange={(e) => setSenha_funcionario(e.target.value)}
              />
              <button type="submit" className="btn-primario">
                Cadastrar
              </button>
            </form>
            <button className="btn-primario" onClick={() => setAba('lista')}>
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
