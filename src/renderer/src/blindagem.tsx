import React, { useState } from 'react'
import MenuLateral from './menuLateral'
import './assets/css/blindagem.css'

export default function Blindagem() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'nova-os'>('lista')

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
                    <th>PRAZO</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>#BL-001</strong>
                    </td>
                    <td>Toyota Corolla · ABC-1D23</td>
                    <td>João P. Almeida</td>
                    <td>
                      <span className="badge-v blindagem">03 — Placas</span>
                    </td>
                    <td>Carlos Souza</td>
                    <td>30/05/2026</td>
                    <td>
                      <span className="badge-v blindagem">Em Andamento</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* FORMULÁRIO DE NOVA OS (Conforme image_a131e6.png) */
          <div className="form-os-card">
            <h3 className="form-os-titulo">
              <i className="fa fa-shield" aria-hidden="true"></i> Dados da Ordem de Serviço
            </h3>
            <div className="form-os-grid">
              <div className="campo-os">
                <label>CLIENTE</label>
                <select>
                  <option>Selecionar...</option>
                </select>
              </div>
              <div className="campo-os">
                <label>VEÍCULO</label>
                <select>
                  <option>Selecionar...</option>
                </select>
              </div>
              <div className="campo-os">
                <label>NÍVEL DE BLINDAGEM</label>
                <select>
                  <option>Nível III — IIIA</option>
                </select>
              </div>
              <div className="campo-os">
                <label>TÉCNICO RESPONSÁVEL</label>
                <select>
                  <option>Carlos Eduardo Souza</option>
                </select>
              </div>
              <div className="campo-os">
                <label>DATA DE INÍCIO</label>
                <input type="date" />
              </div>
              <div className="campo-os">
                <label>PRAZO DE ENTREGA</label>
                <input type="date" />
              </div>
              <div className="campo-os full">
                <label>OBSERVAÇÕES</label>
                <textarea placeholder="Detalhes específicos do serviço..."></textarea>
              </div>
            </div>
            <div className="form-os-acoes">
              <button className="btn-cancelar" onClick={() => setAbaAtiva('lista')}>
                Cancelar
              </button>
              <button className="btn-abrir-os">✓ Abrir OS de Blindagem</button>
            </div>
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
