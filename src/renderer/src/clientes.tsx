import React, { useState, useEffect } from 'react'
import './assets/css/clientes.css'
import MenuLateral from './menuLateral'
import { Listar_clientes, Atualizar_cliente } from './services/clientes_api'
import { Cadastrar_cliente } from './services/Adm_api'

export default function Clientes() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'cadastro' | 'atualizacao'>('lista')
  const [busca, setBusca] = useState('')
  const [clientes, setClientes] = useState<any[]>([])

  useEffect(() => {
    Listar_clientes().then((dados) => {
      setClientes(dados)
    })
  })

  const [nome_cliente, setNome_cliente] = useState('')
  const [email_cliente, setEmail_cliente] = useState('')
  const [senha_cliente, setSenha_cliente] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  const LidarCadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)

    if (!nome_cliente.trim() || !email_cliente.trim() || !senha_cliente.trim()) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
      return
    }
    try {
      const resposta = await Cadastrar_cliente(nome_cliente, email_cliente, senha_cliente)
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
      setErro('Erro ao cadastrar cliente.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null)
  // 1. Inicializa os estados diretamente com os dados do cliente se ele já existir
  const [novoNome, setNovoNome] = useState<string>(() => clienteSelecionado?.nome_usuario || '')
  const [novoEmail, setNovoEmail] = useState<string>(() => clienteSelecionado?.email_usuario || '')
  const [novaSenha, setNovaSenha] = useState<string>('')
  const lidarAtualizacao = async (e) => {
    e.preventDefault()
    try {
      const id = clienteSelecionado.id_usuario
      const dadosAtualizar = {
        nome_usuario: novoNome,
        email_usuario: novoEmail,
        senha_usuario: novaSenha
      }
      await Atualizar_cliente(id, dadosAtualizar)
      setAbaAtiva('lista')
    } catch (error) {
      console.error('Erro ao atualizar cliente: ', error)
    }
  }

  return (
    <div className="tela-inteira">
      <MenuLateral />
      <div className="pagina-container">
        <header className="cabecalho-clientes">
          <div>
            <h1 className="titulo-secao">Gestão de Clientes</h1>
            <p className="subtitulo-secao">Administre a base de clientes e frotas vinculadas</p>
          </div>
          <button className="btn-novo" onClick={() => setAbaAtiva('cadastro')}>
            + Novo Cliente
          </button>
        </header>

        <div className="abas-navegacao">
          {' '}
          {/* Navegação entre abas */}
          <button
            className={`aba-link ${abaAtiva === 'lista' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('lista')}
          >
            Lista de Clientes
          </button>
          <button
            className={`aba-link ${abaAtiva === 'cadastro' ? 'ativa' : ''}`}
            onClick={() => setAbaAtiva('cadastro')}
          >
            Cadastrar Novo
          </button>
        </div>

        <main className="conteudo-dinamico">
          {abaAtiva === 'lista' ? (
            <section className="sessao-lista">
              <div className="barra-busca-row">
                <input
                  placeholder="Buscar por nome ou documento..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="input-busca"
                />
              </div>

              <div className="tabela-wrapper">
                <table className="tabela-clientes">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((c) => (
                      <tr key={c.id_usuario}>
                        <td>{c.nome_usuario}</td>
                        <td>{c.email_usuario}</td>
                        <td className="acoes-b">
                          <button
                            onClick={() => {
                              setClienteSelecionado(c)
                              setAbaAtiva('atualizacao')
                            }}
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </button>
                          <button>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : abaAtiva === 'atualizacao' ? (
            <div className="form-card-v">
              <form className="card-form-v" onSubmit={lidarAtualizacao}>
                <h2>Atualize o cliente {clienteSelecionado.nome_usuario}</h2>
                <div className="atualizar-blindagem">
                  <div>
                    <label>Nome atual do cliente: {clienteSelecionado.nome_usuario}</label>
                    <input
                      type="text"
                      placeholder="Novo nome do cliente"
                      onChange={(e) => setNovoNome(e.target.value)}
                      value={novoNome}
                    />
                  </div>
                  <div></div>
                </div>
              </form>
            </div>
          ) : (
            <section className="sessao-cadastro">
              {erro && <div className="mensagem_erro">{erro}</div>}
              <form className="card-form" onSubmit={LidarCadastro}>
                <h3 className="titulo-card">Dados Cadastrais</h3>
                <div className="grid-form">
                  <div className="campo-grupo">
                    <label>Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Digite o nome do cliente"
                      value={nome_cliente}
                      onChange={(e) => setNome_cliente(e.target.value)}
                    />
                  </div>
                  <div className="campo-grupo">
                    <label>E-mail de Contato</label>
                    <input
                      type="email"
                      placeholder="cliente@email.com"
                      value={email_cliente}
                      onChange={(e) => setEmail_cliente(e.target.value)}
                    />
                  </div>
                  <div className="campo-grupo">
                    <label>Senha do cliente</label>
                    <input
                      type="password"
                      placeholder="Digite a senha do cliente"
                      value={senha_cliente}
                      onChange={(e) => setSenha_cliente(e.target.value)}
                    />
                  </div>
                </div>

                <div className="acoes-form">
                  <button className="btn-cancelar" onClick={() => setAbaAtiva('lista')}>
                    Cancelar
                  </button>
                  <button className="btn-confirmar" type="submit">
                    Salvar Cliente
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
