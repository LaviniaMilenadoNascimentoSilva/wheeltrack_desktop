import { useState } from 'react'
import './assets/css/documentos.css'
import MenuLateral from './menuLateral'

export default function Documentos() {
  const [busca, setBusca] = useState('')

  const listaDocs = [
    {
      id: 1,
      nome: 'Certificado de Blindagem #BL-001',
      tipo: 'Certificado',
      veiculo: 'ABC-1D23',
      cliente: 'João P. Almeida',
      data: '15/05/2026'
    },
    {
      id: 2,
      nome: 'Laudo de Manutenção #MT-041',
      tipo: 'Laudo',
      veiculo: 'DEF-4G56',
      cliente: 'Trans. Veloz',
      data: '18/05/2026'
    },
    {
      id: 3,
      nome: 'Termo de Entrega — João Almeida',
      tipo: 'Termo',
      veiculo: 'ABC-1D23',
      cliente: 'João P. Almeida',
      data: '12/04/2026'
    }
  ]

  return (
    <div className="tela-inteira">
      <MenuLateral />
      <div className="docs-container">
        {/* CABEÇALHO */}
        <header className="docs-header">
          <div>
            <h1 className="docs-titulo">Documentos</h1>
            <p className="docs-subtitulo">Certificados, termos, laudos e relatórios</p>
          </div>
          <button className="btn-azul">
            <i className="fa fa-file-text-o" aria-hidden="true"></i> Enviar Documento
          </button>
        </header>
        {/* ÁREA DA TABELA */}
        <main className="docs-main-card">
          <div className="docs-busca-area">
            <input
              type="text"
              placeholder="🔍 Buscar documento..."
              className="docs-input-busca"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <table className="docs-tabela">
            <thead>
              <tr>
                <th>DOCUMENTO</th>
                <th>TIPO</th>
                <th>VEÍCULO / OS</th>
                <th>CLIENTE</th>
                <th>DATA</th>
                <th className="txt-centro">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {listaDocs.map((doc) => (
                <tr key={doc.id}>
                  <td className="doc-nome-celula">
                    <span className="ícone-arquivo">📄</span> {doc.nome}
                  </td>
                  <td>
                    <span className="badge-v blindagem">{doc.tipo}</span>
                  </td>
                  <td>{doc.veiculo}</td>
                  <td>{doc.cliente}</td>
                  <td>{doc.data}</td>
                  <td className="doc-acoes-celula">
                    <button className="btn-doc-acao" title="Visualizar">
                      👁️
                    </button>
                    <button className="btn-doc-acao" title="Download">
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  )
}
