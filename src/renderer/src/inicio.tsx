import { useState } from "react";
import ".assets/css/inicio.css"; // importa o arquivo de estilos

const cards = [
  { icone: "👥", numero: 24, texto: "Funcionários"},
  { icone: "💼", numero: 138, texto: "Clientes"},
  { icone: "🚗", numero: 312, texto: "Veículos"},
  { icone: "🛡️", numero: 47, texto: "Blindagens Ativas"},
];
const modulos = [
  { icone: "👥", nome: "Funcionários", detalhe: "Cadastro e gestão de colaboradores", resumo: "24 funcionários cadastrados"},
  { icone: "💼", nome: "Clientes", detalhe: "Clientes e primeiro veículo vinculado", resumo: "138 clientes ativos"},
  { icone: "🚗", nome: "Veículos", detalhe: "Ano, placa, cor, chassi e Renavam", resumo: "312 veículos no sistema"},
  { icone: "🛡️", nome: "Blindagem & Manutenção", detalhe: "Etapas de blindagem e manutenção veicular", resumo: "47 em andamento · 8 OS abertas"},
];
const menuItens = [
  "Início", "Funcionários", "Clientes", "Veículos",
  "Blindagem", "Manutenção", "Documentos", "Configurações",
];

export default function Inicio() {
  const [menuSelecionado, setMenuSelecionado] = useState("Início");
  return (
    <div className="tela-inteira">
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
          {menuItens.map((item) => (
            <button
              key={item}
              onClick={() => setMenuSelecionado(item)}
              className={`menu-botao ${menuSelecionado === item ? "ativo" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="menu-usuario">
          <div className="menu-usuario-avatar">AD</div>
          <div>
            <div className="menu-usuario-nome">Administrador</div>
            <div className="menu-usuario-cargo">Prod · Filial 01</div>
          </div>
        </div>
      </div>{/* fim do menu lateral */}
        
      <div className="area-principal">{/* ── ÁREA PRINCIPAL ── */}
        <div className="topbar">
          <span className="topbar-breadcrumb">
            🏠 / <strong>{menuSelecionado}</strong>
          </span>
          <div className="topbar-botoes">
            <button className="topbar-botao">🔔</button>
            <button className="topbar-botao">❓</button>
            <button className="topbar-botao">👤</button>
          </div>
        </div>

        <div className="conteudo">
          <div className="banner">
            <div>
              <h2 className="banner-titulo">Bem-vindo, Administrador!</h2>
              <p className="banner-subtitulo">WheelTrack Blindagens · Filial 01 — SP · Produção</p>
            </div>
            <div className="banner-badge">🌿 Produção</div>
          </div>

          <div className="grid-stats">{/* 4 cards com números grandes */}
            {cards.map((card) => (
              <div key={card.texto} className="card-stat">
                <div className="card-stat-icone">{card.icone}</div>
                <div className="card-stat-numero">{card.numero}</div>
                <div className="card-stat-texto">{card.texto}</div>
              </div>
            ))}
          </div>

          <div className="secao-titulo">Ambientes do Sistema</div>
          <div className="grid-modulos">
            {modulos.map((mod) => (
              <div key={mod.nome} className="card-modulo">
                <div className="card-modulo-icone">{mod.icone}</div>
                <div>
                  <div className="card-modulo-nome">{mod.nome}</div>
                  <div className="card-modulo-detalhe">{mod.detalhe}</div>
                  <div className="card-modulo-resumo">{mod.resumo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>{/* fim do conteúdo */}
      </div>{/* fim da área principal */}
    </div>
  );
}