import React, { useState } from 'react'
import './assets/css/configuracoes.css'
import MenuLateral from './menuLateral'

const USUARIOS_LISTA = [
  { id: 1, nome: 'Administrador', cargo: 'Admin' },
  { id: 2, nome: 'Ana Beatriz', cargo: 'Supervisor' },
  { id: 3, nome: 'Carlos Eduardo', cargo: 'Operador' }
]

export default function Configuracoes() {
  const [aba, setAba] = useState('permissoes')

  const [usuarioSelecionado, setUsuarioSelecionado] = useState(USUARIOS_LISTA[0])
  const [permissaoVer, setPermissaoVer] = useState(true)
  const [permissaoEditar, setPermissaoEditar] = useState(false)
  const [permissaoExcluir, setPermissaoExcluir] = useState(false)

  const [etapas, setEtapas] = useState([
    { id: 1, nome: 'Vistoria Inicial' },
    { id: 2, nome: 'Montagem de Kit' }
  ])

  // --- FUNÇÕES DE LÓGICA ---
  const tratarMudancaUsuario = (idDigitado: string) => {
    // Procuramos o usuário na lista. Usamos == porque o ID é número e o valor do select é string.
    const usuarioEncontrado = USUARIOS_LISTA.find((u) => u.id == Number(idDigitado))

    if (usuarioEncontrado) {
      setUsuarioSelecionado(usuarioEncontrado)
    }
  }

  function adicionarEtapa() {
    const novaEtapa = { id: Date.now(), nome: 'Nova Etapa' }
    setEtapas([...etapas, novaEtapa])
  }

  function salvarConfiguracoes() {
    alert('As configurações foram salvas com sucesso!')
  }

  // --- RENDERIZAÇÃO ---
  return (
    <div className="tela-inteira">
      <MenuLateral />
      <div className="container-config">
        <h1>Configurações do Sistema</h1>

        {/* Menu de Abas */}
        <div className="menu-abas">
          <button
            className={aba === 'permissoes' ? 'active' : ''}
            onClick={() => setAba('permissoes')}
          >
            🔑 Permissões
          </button>
          <button className={aba === 'etapas' ? 'active' : ''} onClick={() => setAba('etapas')}>
            📋 Etapas
          </button>
        </div>

        <hr />

        {/* Conteúdo da Aba: PERMISSÕES */}
        {aba === 'permissoes' && (
          <div className="card-aba">
            <h3>Gerenciar Acesso: {usuarioSelecionado.nome}</h3>

            <div className="campo">
              <label>Selecionar Colaborador:</label>
              <select
                value={usuarioSelecionado.id}
                onChange={(e) => tratarMudancaUsuario(e.target.value)}
              >
                {USUARIOS_LISTA.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome} ({u.cargo})
                  </option>
                ))}
              </select>
            </div>

            <div className="lista-checks">
              <label>
                <input
                  type="checkbox"
                  checked={permissaoVer}
                  onChange={() => setPermissaoVer(!permissaoVer)}
                />
                Pode Visualizar o Sistema
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={permissaoEditar}
                  onChange={() => setPermissaoEditar(!permissaoEditar)}
                />
                Pode Editar Registros
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={permissaoExcluir}
                  onChange={() => setPermissaoExcluir(!permissaoExcluir)}
                />
                Pode Excluir Dados
              </label>
            </div>
          </div>
        )}

        {/* Conteúdo da Aba: ETAPAS */}
        {aba === 'etapas' && (
          <div className="card-aba">
            <h3>Etapas do Processo de Blindagem</h3>
            <ul className="lista-etapas">
              {etapas.map((item) => (
                <li key={item.id}>
                  <span className="id-etapa">ID: {item.id}</span>
                  <input
                    type="text"
                    value={item.nome}
                    onChange={(e) => {
                      const novaLista = etapas.map((etp) =>
                        etp.id === item.id ? { ...etp, nome: e.target.value } : etp
                      )
                      setEtapas(novaLista)
                    }}
                  />
                </li>
              ))}
            </ul>
            <button className="btn-add" onClick={adicionarEtapa}>
              + Adicionar Nova Linha
            </button>
          </div>
        )}

        {/* Botão de Rodapé */}
        <div className="rodape">
          <button className="btn-salvar" onClick={salvarConfiguracoes}>
            💾 SALVAR TODAS AS ALTERAÇÕES
          </button>
        </div>
      </div>
    </div>
  )
}
