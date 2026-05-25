import React, { useState, useEffect } from 'react'
import './assets/css/clientes.css'
import MenuLateral from './menuLateral'
import { Listar_clientes } from './services/clientes_api'

export default function Clientes() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'cadastro'>('lista')
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

    if(!nome_cliente.trim() || !email_cliente.trim() || !senha_cliente.trim()) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
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
              <div className="barra-filtro">
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
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((c) => (
                      <tr key={c.id_usuario}>
                        <td>{c.nome_usuario}</td>
                        <td>{c.email_usuario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <section className="sessao-cadastro">
              <div className="card-form">
                <h3 className="titulo-card">Dados Cadastrais</h3>
                <div className="grid-form">
                  <div className="campo-grupo">
                    <label>Nome Completo ou Razão Social</label>
                    <input type="text" placeholder="Digite o nome" />
                  </div>
                  <div className="campo-grupo">
                    <label>CPF ou CNPJ</label>
                    <input type="text" placeholder="00.000.000/0000-00" />
                  </div>
                  <div className="campo-grupo">
                    <label>E-mail de Contato</label>
                    <input type="email" placeholder="cliente@email.com" />
                  </div>
                  <div className="campo-grupo">
                    <label>Telefone / WhatsApp</label>
                    <input type="text" placeholder="(00) 00000-0000" />
                  </div>
                </div>

                <div className="acoes-form">
                  <button className="btn-cancelar" onClick={() => setAbaAtiva('lista')}>
                    Cancelar
                  </button>
                  <button className="btn-confirmar">Salvar Cliente</button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
