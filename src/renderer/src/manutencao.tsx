import React, { useState } from 'react'
import './assets/css/manutencao.css'
import MenuLateral from './menuLateral'

export default function Manutencao() {
  const [abaAtiva, setAbaAtiva] = useState<'etapas' | 'nova-os'>('etapas')

  return (
    <div className="tela-inteira">
      {' '}
      <MenuLateral />
      <div className="manutencao-container">
        {/* CABEÇALHO */}
        <header className="manutencao-header">
          <div>
            <h1 className="titulo-pg">Etapas de Manutenção</h1>
            <p className="subtitulo-pg">Acompanhe as manutenções em andamento</p>
          </div>
          <button className="btn-laranja" onClick={() => setAbaAtiva('nova-os')}>
            + Nova OS Manutenção
          </button>
        </header>

        {abaAtiva === 'etapas' ? (
          <>
            <div className="grid-etapas-mt">
              {' '}
              {/* CARDS DE ETAPAS (Fluxo Visual) */}
              <CardEtapa
                num="01"
                titulo="Diagnóstico"
                desc="Identificação de problemas e peças"
                ativa
              />
              <CardEtapa
                num="02"
                titulo="Orçamento Aprovado"
                desc="Envio e aprovação pelo cliente"
              />
              <CardEtapa
                num="03"
                titulo="Execução do Serviço"
                desc="Correções e substituição de peças"
                destaque
              />
              <CardEtapa num="04" titulo="Controle de Qualidade" desc="Inspeção final e testes" />
              <CardEtapa
                num="05"
                titulo="Entrega ao Cliente"
                desc="Assinatura do termo e entrega"
              />
            </div>
            <div className="tabela-mt-box">
              {' '}
              {/* TABELA DE ORDENS DE SERVIÇO */}
              <table className="tabela-mt">
                <thead>
                  <tr>
                    <th>OS</th>
                    <th>VEÍCULO</th>
                    <th>TIPO</th>
                    <th>ETAPA</th>
                    <th>MECÂNICO</th>
                    <th>PRAZO</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>#MT-041</strong>
                    </td>
                    <td>Honda HR-V · DEF-4G56</td>
                    <td>Preventiva</td>
                    <td>
                      <span className="tag-etapa v-03">03 — Execução</span>
                    </td>
                    <td>Marcos Rocha</td>
                    <td>20/05/2026</td>
                    <td>
                      <span className="badge-status andamento">Em Andamento</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>#MT-042</strong>
                    </td>
                    <td>VW T-Cross · GHI-7J89</td>
                    <td>Corretiva</td>
                    <td>
                      <span className="tag-etapa v-01">01 — Diagnóstico</span>
                    </td>
                    <td>Marcos Rocha</td>
                    <td>25/05/2026</td>
                    <td>
                      <span className="badge-status aguardando">Aguardando</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="form-mt-card">
            {' '}
            /* FORMULÁRIO DE NOVA OS */
            <h3 className="form-mt-titulo">🔧 Dados da Manutenção</h3>
            <div className="form-mt-grid">
              <div className="campo-mt">
                <label>CLIENTE</label>
                <select>
                  <option>Selecionar cliente...</option>
                </select>
              </div>
              <div className="campo-mt">
                <label>VEÍCULO</label>
                <select>
                  <option>Selecionar veículo...</option>
                </select>
              </div>
              <div className="campo-mt">
                <label>TIPO DE MANUTENÇÃO</label>
                <select>
                  <option>Preventiva</option>
                  <option>Corretiva</option>
                </select>
              </div>
              <div className="campo-mt double">
                <label>MECÂNICO RESPONSÁVEL</label>
                <select>
                  <option>Marcos Antônio Rocha</option>
                </select>
              </div>
              <div className="campo-mt">
                <label>PRAZO DE ENTREGA</label>
                <input type="date" />
              </div>
              <div className="campo-mt full">
                <label>DESCRIÇÃO DO SERVIÇO / PROBLEMA RELATADO</label>
                <textarea placeholder="Descreva detalhadamente o problema ou serviço solicitado..."></textarea>
              </div>
            </div>
            <div className="form-mt-acoes">
              <button className="btn-cancelar" onClick={() => setAbaAtiva('etapas')}>
                Cancelar
              </button>
              <button className="btn-salvar">✓ Abrir OS de Manutenção</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// Componente Interno para os Cards de Etapa
const CardEtapa: React.FC<any> = ({ num, titulo, desc, ativa, destaque }) => (
  <div className={`card-etapa-mt ${ativa ? 'ativa' : ''} ${destaque ? 'destaque' : ''}`}>
    <div className="mt-numero-circulo">{num}</div>
    <h4 className="mt-etapa-titulo">{titulo}</h4>
    <p className="mt-etapa-desc">{desc}</p>
  </div>
)
