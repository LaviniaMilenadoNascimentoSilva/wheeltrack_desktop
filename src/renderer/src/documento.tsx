import { useState, useEffect } from 'react'
import './assets/css/documentos.css'
import './assets/css/login.css'
import MenuLateral from './menuLateral'
import { Listar_documentos, Cadastrar_documento } from './services/documento_api'
import { Listar_veiculos } from './services/veiculos_api'
import { Listar_funcionarios } from './services/funcionario_api'

export default function Documentos() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'cadastro'>('lista')
  const [busca, setBusca] = useState('')
  const [documento, setDocumento] = useState<any[]>([])
  const [veiculos, setVeiculos] = useState<any[]>([])
  const [funcionarios, setFuncionarios] = useState<any[]>([])
  const [veiculoSelecionado, setVeiculoSelecioando] = useState('')
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState('')

  useEffect(() => {
    if (abaAtiva === 'lista') {
      Listar_documentos().then((dados) => {
        setDocumento(dados)
      })
    }
  })
  useEffect(() => {
    Listar_funcionarios().then((dados) => {
      setFuncionarios(dados)
    })
    Listar_veiculos().then((dados) => {
      setVeiculos(dados)
    })
  })

  const [arquivoSelecionado, setArquivoSelecionado] = useState<file | null>(null)
  const [tipo_documento, setTipo_documento] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)

  const Lidar_cadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)
    setSucesso(null)
    if (!tipo_documento.trim() || !funcionarioSelecionado || !veiculoSelecionado) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
      return
    }
    try {
      const resposta = await Cadastrar_documento(
        arquivoSelecionado, // O arquivo 'File' que você pegou do input do form
        tipo_documento,
        parseInt(funcionarioSelecionado), // Seu parseInt tratando o número perfeitamente!
        veiculoSelecionado
      )
      console.log('Sucesso ao cadastrar: ', resposta)
      if (resposta && resposta.includes('sucesso')) {
        setSucesso('Sucesso ao cadastrar!')
        setTimeout(() => setSucesso(null), 3000)
        setArquivoSelecionado(null)
        setTipo_documento('')
      } else {
        setErro('Erro ao enviar o documento!')
        setTimeout(() => setErro(null), 3000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      setErro('Erro ao cadastrar documento.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  return (
    <div className="tela-inteira">
      {' '}
      <MenuLateral />
      <div className="docs-container">
        {/* CABEÇALHO */}
        <header className="docs-header">
          <div>
            <h1 className="docs-titulo">Documentos</h1>
            <p className="docs-subtitulo">Certificados, termos, laudos e relatórios</p>
          </div>
          <button className="btn-azul" onClick={() => setAbaAtiva('cadastro')}>
            <i className="fa fa-file-text-o"></i> Enviar Documento
          </button>
        </header>
        {/* ÁREA DA TABELA */}
        {abaAtiva === 'lista' ? (
          <div className="docs-main-card">
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
                  <th>ARQUIVO</th>
                  <th>TIPO</th>
                  <th>VEÍCULO / OS</th>
                  <th>FUNCIONARIO</th>
                  <th>CLIENTE</th>
                  {/*<th>DATA</th>*/}
                  <th className="txt-centro">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {documento.map((doc) => (
                  <tr key={doc.id_documento}>
                    <td className="doc-nome-celula">
                      <span className="ícone-arquivo">📄</span> {doc.nome_arquivo}
                    </td>
                    <td>
                      <span className="badge-v blindagem">{doc.tipo_arquivo}</span>
                    </td>
                    <td>
                      <span className="badge-v blindagem">{doc.tipo_documento}</span>
                    </td>
                    <td>{doc.placa_veiculo.modelo}</td>
                    <td>{doc.id_funcionario.nome_funcionario}</td>
                    <td>{doc.placa_veiculo.usuario.nome_usuario}</td>
                    {/*<td>{doc.data_upload}</td>*/}
                    <td className="doc-acoes-celula">
                      <button className="btn-doc-acao" title="Visualizar">
                        👁️
                      </button>
                      <button
                        className="btn-doc-acao"
                        title="Download"
                        onClick={() => {
                          window.location.href = `http://3.16.156.201:8081/documento/download/${doc.id_documento}`
                        }}
                      >
                        <i className="fa fa-upload" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="form-card-v">
            {erro && <div className="mensagem_erro">{erro}</div>}
            {sucesso && <div className="mensagem_sucesso">{sucesso}</div>}
            <h1>Envie um novo documento ao cliente</h1>
            <form onSubmit={Lidar_cadastro} className="card-form-v">
              <div className="form-os-grid">
                <div className="campo-os">
                  <label>Escolha o arquivo do documento</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      // Verifica se o usuário realmente escolheu um arquivo
                      if (e.target.files && e.target.files[0]) {
                        setArquivoSelecionado(e.target.files[0]) // Guarda o arquivo binário bruto
                      }
                    }}
                    className="botao_file"
                  />
                </div>
                <div className="campo-os">
                  <label>Escreva o tipo do documento</label>
                  <input
                    type="text"
                    placeholder="EX: autorização do exército"
                    value={tipo_documento}
                    onChange={(e) => setTipo_documento(e.target.value)}
                  />
                </div>
                <div className="campo-os">
                  <label>Escolha o veículo proprietario</label>
                  <select
                    value={veiculoSelecionado}
                    onChange={(e) => setVeiculoSelecioando(e.target.value)}
                  >
                    <option value="">Selecionar um veículo</option>
                    {veiculos.map((veiculo) => (
                      <option key={veiculo.placa} value={veiculo.placa}>
                        {veiculo.placa} - {veiculo.modelo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="campo-os">
                  <label>Escolha o funcionário responsavel</label>
                  <select
                    value={funcionarioSelecionado}
                    onChange={(e) => setFuncionarioSelecionado(e.target.value)}
                  >
                    <option value="">Selecionar um funcionário</option>
                    {funcionarios.map((funcionario) => (
                      <option key={funcionario.id_funcionario} value={funcionario.id_funcionario}>
                        {funcionario.nome_funcionario}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-botoes-v">
                <button onClick={() => setAbaAtiva('lista')} className="btn-azul">
                  Voltar
                </button>
                <button className="btn-azul" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
