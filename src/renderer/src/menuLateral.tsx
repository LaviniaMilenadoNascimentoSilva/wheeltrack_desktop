import { useNavigate, useLocation } from 'react-router-dom'
import './assets/css/inicio.css' // importa o arquivo de estilos

export default function MenuLateral() {
  const navigate = useNavigate()
  const location = useLocation()

  const rotaAtiva = location.pathname
  return (
    <div>
      <div className="menu-lateral">
        <div className="menu-logo">
          <div className="menu-logo-icone">🔰</div>
          <span className="menu-logo-texto">
            Wheel<span>Track</span>
          </span>
        </div>

        <div className="menu-empresa">
          <div className="menu-empresa-label">Empresa / Filial</div>
          <div className="menu-empresa-nome">WT Blindagens · Filial 01</div>
        </div>

        <div className="menu-botoes">
          <button
            onClick={() => navigate('/home')}
            className={`menu-botao ${rotaAtiva === '/home' ? 'ativo' : ''}`}
          >
            Inicio
          </button>
          <button
            onClick={() => navigate('/funcionarios')}
            className={`menu-botao ${rotaAtiva == '/funcionarios' ? 'ativo' : ''}`}
          >
            Funcionarios
          </button>
          <button
            onClick={() => navigate('/clientes')}
            className={`menu-botao ${rotaAtiva === '/clientes' ? 'ativo' : ''}`}
          >
            Clientes
          </button>
          <button
            onClick={() => navigate('/veiculos')}
            className={`menu-botao ${rotaAtiva === '/veiculos' ? 'ativo' : ''}`}
          >
            Veículos
          </button>
          <button
            onClick={() => navigate('/blindagem')}
            className={`menu-botao ${rotaAtiva === '/blindagem' ? 'ativo' : ''}`}
          >
            Blindagem
          </button>
          <button
            onClick={() => navigate('/manutencao')}
            className={`menu-botao ${rotaAtiva === '/manutencao' ? 'ativo' : ''}`}
          >
            Manutenção
          </button>
          <button
            onClick={() => navigate('/documentos')}
            className={`menu-botao ${rotaAtiva === '/documentos' ? 'ativo' : ''}`}
          >
            Documentos
          </button>
          <button
            onClick={() => navigate('/configuracoes')}
            className={`menu-botao ${rotaAtiva === '/configuracoes' ? 'ativo' : ''}`}
          >
            Configurações
          </button>
          {/*<button
            onClick={() => navigate('/cadastro')}
            className={`menu-botao ${rotaAtiva === '/cadastro' ? 'ativo' : ''}`}
          >
            Cadastro
          </button>*/}
        </div>

        <div className="menu-usuario">
          <div className="menu-usuario-avatar">AD</div>
          <div className="menu-usuario-info">
            <div className="menu-usuario-nome">Administrador</div>
            <div className="menu-usuario-cargo">Prod · Filial 01</div>
          </div>
          <button onClick={() => navigate('/')} className="menu_botao_sair">
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}
