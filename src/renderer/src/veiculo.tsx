import React, { useState, useEffect } from 'react'
import './assets/css/veiculo.css'
import './assets/css/login.css'
import MenuLateral from './menuLateral'
import { Listar_veiculos, Deletar_veiculo, Atualizar_veiculo } from './services/veiculos_api'
import { Cadastrar_veiculo } from './services/Adm_api'
import { Listar_clientes } from './services/clientes_api'

export default function Veiculos() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'cadastro' | 'atualizacao'>('lista')
  const [veiculos, setVeiculos] = useState<any[]>([])
  const [clienteBanco, setClienteBanco] = useState<any[]>([])
  const [clienteSelecionado, setClienteSelecionado] = useState('')
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<any>(null)

  useEffect(() => {
    if (abaAtiva === 'lista') {
      Listar_veiculos().then((dados) => {
        setVeiculos(dados)
      })
    }
  }, [abaAtiva])
  useEffect(() => {
    Listar_clientes().then((dados) => {
      setClienteBanco(dados)
    })
  })

  const [Cor, setCor] = useState('')
  const [modelo, setModelo] = useState('')
  const [placa, setPlaca] = useState('')
  const [ano_veiculo, setAno_veiculo] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)

  const LidarCadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)
    if (
      !Cor.trim() ||
      !modelo.trim() ||
      !placa.trim() ||
      !ano_veiculo.trim() ||
      !clienteSelecionado
    ) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
      return
    }
    try {
      const resposta = await Cadastrar_veiculo(
        Cor,
        modelo,
        placa,
        parseInt(ano_veiculo),
        clienteSelecionado
      )
      console.log('Sucesso ao cadastrar: ', resposta)
      if (resposta.sucesso) {
        setSucesso('Cadastro bem-sucedido!')
        setTimeout(() => setSucesso(null), 3000)
      } else {
        setErro(resposta.mensagem)
        setTimeout(() => setErro(null), 3000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      setErro('Erro ao cadastrar veículo.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  const lidarDeletar = async (placa: string): Promise<void> => {
    const confirmar = window.confirm(`Tem certeza que deseja deletar o veículo de placa ${placa}?`)
    if (confirmar) {
      const sucesso = await Deletar_veiculo(placa)
      if (sucesso) {
        setSucesso('Veículo deletado com sucesso!')
        setTimeout(() => setSucesso(null), 2000)
        setAbaAtiva('lista')
      } else {
        setErro('Erro ao deletar o veiculo.')
        setTimeout(() => setErro(null), 2000)
      }
    }
  }

  const lidarAtualizacao = async (e) => {
    e.preventDefault()
    try {
      if (!veiculoSelecionado) {
        setErro('Nenhum veículo selecionado para atualizar.')
        setTimeout(() => setErro(null), 3000)
        return
      }
      const placa = veiculoSelecionado.placa
      const dadosAtualizar = {}
    } catch (error) {
      console.error('Erro ao atualizar veículo: ', error)
      setErro('Erro ao atualizar veículo.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  return (
    <div className="tela-inteira">
      {' '}
      <MenuLateral />
      <div className="pagina-veiculos">
        <header className="topo-flex">
          <div>
            <h1 className="titulo-pg">Veículos</h1>
            <p className="subtitulo-pg">Todos os veículos registrados no sistema</p>
          </div>
          <button className="btn-azul" onClick={() => setAbaAtiva('cadastro')}>
            + Novo Veículo
          </button>
        </header>

        {abaAtiva === 'lista' ? (
          <>
            <div className="grid-cards-veiculos">
              {veiculos.slice(0, 3).map((veiculo) => (
                <div className="card-v" key={veiculo.placa}>
                  <div className="card-v-header">
                    <div>
                      <strong>{veiculo.Cor}</strong>
                      <p>{veiculo.usuario?.nome_usuario || 'sem dono'}</p>
                    </div>
                    <div className="placa-badge-v">{veiculo.placa}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="tabela-container-v">
              {' '}
              {/* TABELA DE LISTAGEM */}
              {erro && <div className="mensagem_erro">{erro}</div>}
              <div className="busca-v">
                <input type="text" placeholder="🔍 Buscar por placa, chassi ou cliente..." />
              </div>
              <table className="tabela-v">
                <thead>
                  <tr className="tabela-header-v">
                    <th>PLACA</th>
                    <th>MODELO</th>
                    <th>COR</th>
                    <th>ANO</th>
                    <th>CLIENTE</th>
                    <th>Situação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculos.map((veiculo) => (
                    <tr key={veiculo.placa}>
                      <td>{veiculo.placa}</td>
                      <td>{veiculo.modelo}</td>
                      <td>{veiculo.cor}</td>
                      <td>{veiculo.ano_veiculo}</td>
                      <td>{veiculo.usuario?.nome_usuario || 'sem dono'}</td>
                      <td>
                        <span className="badge-v blindagem">Blindagem</span>
                      </td>
                      <td className="acoes-v">
                        <button
                          onClick={() => {
                            setVeiculoSelecionado(veiculo)
                            setAbaAtiva('atualizacao')
                          }}
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </button>
                        <button>👁️</button>
                        <button onClick={() => lidarDeletar(veiculo.placa)}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="form-card-v">
            {erro && <div className="mensagem_erro">{erro}</div>}
            {sucesso && <div className="mesnagem_sucesso">{sucesso}</div>}
            <form className="card-form-v" onSubmit={LidarCadastro}>
              <h3 className="form-secao-titulo">
                <i className="fa fa-car" aria-hidden="true"></i> Dados do Veículo
              </h3>
              <div className="form-grid-v">
                <div className="campo-v">
                  <label>MODELO</label>
                  <input
                    type="text"
                    placeholder="Coloque o modelo do veículo"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                  />
                </div>
                <div className="campo-v">
                  <label>COR</label>
                  <input
                    type="text"
                    placeholder="Coloque a Cor do veículo"
                    value={Cor}
                    onChange={(e) => setCor(e.target.value)}
                  />
                </div>
                <div className="campo-v">
                  <label>ANO DO VEÍCULO</label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={ano_veiculo}
                    onChange={(e) => setAno_veiculo(e.target.value)}
                  />
                </div>
                <div className="campo-v">
                  <label>PLACA</label>
                  <input
                    type="text"
                    placeholder="ABC-1D23"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                  />
                </div>
                <div className="campo-v">
                  <label>CLIENTE PROPRIETÁRIO</label>
                  <select
                    value={clienteSelecionado}
                    onChange={(e) => setClienteSelecionado(e.target.value)}
                  >
                    <option value="">Selecionar cliente...</option>
                    {clienteBanco.map((cliente) => (
                      <option key={cliente.id_usuario} value={cliente.id_usuario}>
                        {cliente.nome_usuario}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-botoes-v">
                <button className="btn-v-cancelar" onClick={() => setAbaAtiva('lista')}>
                  Cancelar
                </button>
                <button className="btn-v-salvar">✓ Salvar Veículo</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
// Componente auxiliar para os cards do topo
