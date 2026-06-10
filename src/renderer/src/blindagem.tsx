import React, { useState, useEffect } from 'react'
import MenuLateral from './menuLateral'
import './assets/css/blindagem.css'
import {
  Listar_blindagens,
  Atualizar_blindagem,
  Cadastrar_blindagem,
  Deletar_blindagem
} from './services/blindagem_api'
import { Listar_veiculos } from './services/veiculos_api'

export default function Blindagem() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'nova-os' | 'atualizar'>('lista')
  const [blindagens, setBlindagens] = useState<any[]>([])
  const [veiculoBanco, setVeiculoBanco] = useState<any[]>([])
  const [veiculoSelecionado, setVeiculoSelecionado] = useState('')
  const statusBlind = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO']
  const [blindagemSelecionada, setBlindagemSelecionada] = useState<any>(null)
  useEffect(() => {
    if (abaAtiva === 'lista') {
      Listar_blindagens().then((dados) => {
        setBlindagens(dados)
      })
      Listar_veiculos().then((dados) => {
        setVeiculoBanco(dados)
      })
    }
  }, [abaAtiva])
  useEffect(() => {
    Listar_veiculos().then((dados) => {
      setVeiculoBanco(dados)
    })
  }, [])

  const [novoStatus, setNovoStatus] = useState('')

  const lidarAtualizacao = async (e) => {
    e.preventDefault()
    try {
      const id = blindagemSelecionada.id
      const dadosAtualizar = {
        ...blindagemSelecionada,
        status: novoStatus
      }
      await Atualizar_blindagem(id, dadosAtualizar)
      setAbaAtiva('lista')
    } catch (error) {
      console.log('Erro ao atualizar blindagem: ', error)
    }
  }

  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)
  const [nivel_blindagem, setNivel_blindagem] = useState('')
  const [status, setStatus] = useState('PENDENTE')
  const lidarCadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)
    if (!veiculoSelecionado || !nivel_blindagem.trim() || !status.trim()) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
      return
    }
    try {
      const resposta = await Cadastrar_blindagem(veiculoSelecionado, nivel_blindagem, status)
      console.log('Sucesso ao cadastrar: ', resposta)
      if (resposta && resposta.id) {
        setSucesso('Cadastro bem-sucedido!')
        setTimeout(() => setSucesso(null), 3000)
      } else {
        setErro('Erro ao cadastrar blindagem.')
        setTimeout(() => setErro(null), 3000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      setErro('Erro ao cadastrar blindagem.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  const lidarDeletar = async (id: number) => {
    const confirmar = window.confirm(`Tem certeza que deseja deletar a OS BLI-${id}?`)
    if (confirmar) {
      const sucesso = await Deletar_blindagem(id)
      if (sucesso) {
        setSucesso('Blindagem deletada com sucesso!')
        setTimeout(() => setSucesso(null), 3000)
        setAbaAtiva('lista')
      } else {
        setErro('Erro ao deletar blindagem.')
        setTimeout(() => setErro(null), 3000)
      }
    }
  }

  return (
    <div className="tela-inteira">
      {' '}
      <MenuLateral />
      <div className="blindagem-container">
        <header className="blindagem-header">
          <div>
            <h1 className="titulo-secao">Etapas de Blindagem</h1>
            <p className="subtitulo-secao">Acompanhe o progresso das ordens de blindagem</p>
          </div>
          <button className="btn-azul" onClick={() => setAbaAtiva('nova-os')}>
            + Nova OS Blindagem
          </button>
        </header>

        {abaAtiva === 'lista' ? (
          <>
            {/* BARRA DE PROGRESSO GERAL (Conforme image_a12f00.png) */}
            <div className="progresso-geral">
              <div className="progresso-info">Progresso geral — 47 veículos em blindagem</div>
              <div className="barra-fundo">
                <div className="barra-preenchida" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* GRID DE ETAPAS */}
            <div className="grid-etapas">
              <CardEtapa
                num="01"
                titulo="Recebimento e Vistoria"
                desc="Conferência do veículo e documentação"
                ativa
              />
              <CardEtapa num="02" titulo="Desmontagem" desc="Remoção de painéis e vidros" />
              <CardEtapa
                num="03"
                titulo="Instalação das Placas"
                desc="Posicionamento das placas balísticas"
              />
              <CardEtapa
                num="04"
                titulo="Vidros Blindados"
                desc="Aplicação de vidros laminados"
                destaque
              />
              <CardEtapa
                num="05"
                titulo="Montagem e Acabamento"
                desc="Reinstalação de componentes"
              />
              <CardEtapa
                num="06"
                titulo="Inspeção e Entrega"
                desc="Teste balístico e certificação"
              />
            </div>

            {/* TABELA DE ORDENS DE SERVIÇO */}
            <div className="tabela-blindagem-box">
              <table className="tabela-blindagem">
                <thead>
                  <tr>
                    <th>OS</th>
                    <th>VEÍCULO</th>
                    <th>CLIENTE</th>
                    <th>ETAPA ATUAL</th>
                    <th>TÉCNICO</th>
                    <th>NÍVEL</th>
                    <th>INÍCIO</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {blindagens.map((blindagem) => (
                    <tr key={blindagem.id}>
                      <td>
                        <strong>#BLI-{blindagem.id}</strong>
                      </td>
                      <td>{blindagem.veiculo.modelo}</td>
                      <td>{blindagem.veiculo.usuario.nome_usuario}</td>
                      <td>
                        <span className="badge-v blindagem">03 — Placas</span>
                      </td>
                      <td>Carlos Souza</td>
                      <td>{blindagem.nivel_blindagem}</td>
                      <td>{blindagem.data_inicio}</td>
                      <td>
                        <span className="badge-v blindagem">{blindagem.status}</span>
                      </td>
                      <td className="acoes-b">
                        <button
                          onClick={() => {
                            setBlindagemSelecionada(blindagem)
                            setNovoStatus(blindagem.status)
                            setAbaAtiva('atualizar')
                          }}
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </button>
                        <button onClick={() => lidarDeletar(blindagem.id)}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : abaAtiva === 'atualizar' ? (
          <div className="form-card-v">
            <form className="card-form-v" onSubmit={lidarAtualizacao}>
              <h2>Aba de Atualização</h2>
              <div className="atualizar-blindagem">
                <div>
                  <label>OS selecionada: </label>
                  <strong>#BLI-{blindagemSelecionada?.id || 'Nenhuma'}</strong>
                </div>
                <div>
                  <label>Veículo: </label>
                  <strong>{blindagemSelecionada?.veiculo.modelo}</strong>
                </div>
                <div>
                  <label>Placa: </label>
                  <strong>{blindagemSelecionada?.veiculo.placa}</strong>
                </div>
                <div>
                  <label>Cliente: </label>
                  <strong>{blindagemSelecionada?.veiculo.usuario.nome_usuario}</strong>
                </div>
                <div>
                  <label>Nível da blindagem: </label>
                  <strong>{blindagemSelecionada?.nivel_blindagem}</strong>
                </div>
                <div>
                  <label>Etapa atual: </label>
                  <strong>{blindagemSelecionada?.etapa_atual}</strong>
                </div>
                <div>
                  <label>Status: </label>
                  <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                    {statusBlind.map((statusItem) => (
                      <option key={statusItem} value={statusItem}>
                        {statusItem.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="botoes-atualizar">
                <button className="btn-azul" type="submit">
                  Salvar Atualização
                </button>
                <button type="button" onClick={() => setAbaAtiva('lista')} className="btn-azul">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* FORMULÁRIO DE NOVA OS (Conforme image_a131e6.png) */
          <div className="form-os-card">
            {erro && <div className="mensagem_erro">{erro}</div>}
            {sucesso && <div className="mensagem_sucesso">{sucesso}</div>}
            <h3 className="form-os-titulo">
              <i className="fa fa-shield" aria-hidden="true"></i> Dados da Ordem de Serviço
            </h3>
            <form className="card-form-v" onSubmit={lidarCadastro}>
              <div className="form-os-grid">
                <div className="campo-os">
                  <label>VEÍCULO</label>
                  <select
                    value={veiculoSelecionado}
                    onChange={(e) => setVeiculoSelecionado(e.target.value)}
                  >
                    <option value="">Selecionar veículo...</option>
                    {veiculoBanco.map((veiculo) => (
                      <option key={veiculo.placa} value={veiculo.placa}>
                        {veiculo.placa} - {veiculo.modelo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="campo-os">
                  <label>NÍVEL DE BLINDAGEM</label>
                  <select
                    value={nivel_blindagem}
                    onChange={(e) => setNivel_blindagem(e.target.value)}
                  >
                    <option value="">Selecionar nível...</option>
                    <option value="I">Nível I | A1</option>
                    <option value="II">Nível II | A2</option>
                    <option value="III">Nível III | A3</option>
                  </select>
                </div>
                <div className="campo-os">
                  <label>TÉCNICO RESPONSÁVEL</label>
                  <select>
                    <option>Carlos Eduardo Souza</option>
                  </select>
                </div>
                <div className="campo-os">
                  <label>Status da blindagem</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PENDENTE">Pendente</option>
                    <option value="EM_ANDAMENTO">Em andamento</option>
                    <option value="CONCLUIDO">Concluído</option>
                  </select>
                </div>
                {/*<div className="campo-os">
                  <label>DATA DE INÍCIO</label>
                  <input type="date" />
                </div>
                <div className="campo-os">
                  <label>PRAZO DE ENTREGA</label>
                  <input type="date" />
                </div>*/}
                <div className="campo-os full">
                  <label>OBSERVAÇÕES</label>
                  <textarea placeholder="Detalhes específicos do serviço..."></textarea>
                </div>
              </div>
              <div className="form-os-acoes">
                <button className="btn-cancelar" onClick={() => setAbaAtiva('lista')}>
                  Cancelar
                </button>
                <button className="btn-abrir-os" type="submit">
                  ✓ Abrir OS de Blindagem
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

const CardEtapa: React.FC<any> = ({ num, titulo, desc, ativa, destaque }) => (
  <div className={`card-etapa ${ativa ? 'ativa' : ''} ${destaque ? 'destaque' : ''}`}>
    <div className="etapa-numero">{num}</div>
    <h4 className="etapa-titulo">{titulo}</h4>
    <p className="etapa-desc">{desc}</p>
  </div>
)
