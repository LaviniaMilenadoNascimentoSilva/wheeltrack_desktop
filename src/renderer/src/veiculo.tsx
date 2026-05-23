import React, { useState } from 'react';
import './assets/css/veiculos.css';

export default function Veiculos() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'cadastro'>('lista');

  return (
    <div className="pagina-veiculos">
      <header className="topo-flex">
        <div>
          <h1 className="titulo-pg">Veículos</h1>
          <p className="subtitulo-pg">Todos os veículos registrados no sistema</p>
        </div>
        <button className="btn-laranja" onClick={() => setAbaAtiva('cadastro')}>
          + Novo Veículo
        </button>
      </header>

      {abaAtiva === 'lista' ? (
        <>
          <div className="grid-cards-veiculos">
            <CardVeiculo topo="Toyota Corolla" placa="ABC1D23" dono="João Pedro Almeida" status="Em Blindagem" statusCor="vermelho" />
            <CardVeiculo topo="Honda HR-V" placa="DEF4G56" dono="Transportadora Veloz" status="Manutenção" statusCor="verde" />
            <CardVeiculo topo="VW T-Cross" placa="GHI7J89" dono="Maria Aparecida Santos" status="Aguardando" statusCor="cinza" />
          </div>

          <div className="tabela-container-v"> {/* TABELA DE LISTAGEM */}
            <div className="busca-v">
              <input type="text" placeholder="🔍 Buscar por placa, chassi ou cliente..." />
            </div>
            <table className="tabela-v">
              <thead>
                <tr>
                  <th>PLACAS</th>
                  <th>MARCA/MODELO</th>
                  <th>ANO</th>
                  <th>COR</th>
                  <th>CLIENTE</th>
                  <th>STATUS</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>ABC-1D23</strong></td>
                  <td>Toyota Corolla</td>
                  <td>2023/2024</td>
                  <td>Preto</td>
                  <td>João Pedro Almeida</td>
                  <td><span className="badge-v blindagem">Blindagem</span></td>
                  <td className="acoes-v"><button>✏️</button><button>👁️</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="form-card-v">
          <h3 className="form-secao-titulo">🚗 Dados do Veículo</h3>
          <div className="form-grid-v">
            <div className="campo-v full">
              <label>MARCA / MODELO</label>
              <input type="text" placeholder="Ex: Toyota Hilux" />
            </div>
            <div className="campo-v"><label>ANO FABRICAÇÃO</label><input type="text" placeholder="2024" /></div>
            <div className="campo-v"><label>ANO MODELO</label><input type="text" placeholder="2025" /></div>
            <div className="campo-v"><label>PLACA</label><input type="text" placeholder="ABC-1D23" /></div>
            <div className="campo-v"><label>COR</label><input type="text" placeholder="Branco" /></div>
            <div className="campo-v">
              <label>TIPO DE COMBUSTÍVEL</label>
              <select><option>Flex</option><option>Diesel</option></select>
            </div>
            <div className="campo-v">
              <label>CATEGORIA</label>
              <select><option>Passeio</option><option>Utilitário</option></select>
            </div>
            <div className="campo-v"><label>CHASSI</label><input type="text" placeholder="9BWZZZ..." /></div>
            <div className="campo-v"><label>RENAVAM</label><input type="text" placeholder="000000000" /></div>
            <div className="campo-v full">
              <label>CLIENTE PROPRIETÁRIO</label>
              <select><option>Selecionar cliente...</option></select>
            </div>
          </div>
          <div className="form-botoes-v">
            <button className="btn-v-cancelar" onClick={() => setAbaAtiva('lista')}>Cancelar</button>
            <button className="btn-v-salvar">✓ Salvar Veículo</button>
          </div>
        </div>
      )}
    </div>
  );
};
// Componente auxiliar para os cards do topo
const CardVeiculo: React.FC<any> = ({ topo, placa, dono, status, statusCor }) => (
  <div className="card-v">
    <div className="card-v-header">
      <div><strong>{topo}</strong><p>{dono}</p></div>
      <div className="placa-badge-v">{placa}</div>
    </div>
    <div className={`status-v-tag ${statusCor}`}>{status}</div>
  </div>
);