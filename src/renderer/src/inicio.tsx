import { useState } from 'react'
//import { Link, useNavigate } from 'react-router-dom'
import MenuLateral from './menuLateral'
import './assets/css/inicio.css' // importa o arquivo de estilos
import { Listar_funcionarios } from './services/funcionario_api'
import { useEffect } from 'react'
import { Listar_clientes } from './services/clientes_api'
import { Listar_veiculos } from './services/veiculos_api'
import { Listar_blindagens } from './services/blindagem_api'

export default function Inicio() {
  //const [menuSelecionado, setMenuSelecionado] = useState('Início')
  const [funcionarios, setFuncionarios] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [veiculos, setVeiculos] = useState<any[]>([])
  const [blindagens, setBlindagens] = useState<any[]>([])

  useEffect(() => {
    Listar_funcionarios().then((dados) => {
      setFuncionarios(dados)
    })
    Listar_clientes().then((dados) => {
      setClientes(dados)
    })
    Listar_veiculos().then((dados) => {
      setVeiculos(dados)
    })
    Listar_blindagens().then((dados) => {
      setBlindagens(dados)
    })
  }, [])
  return (
    <div className="tela-inteira">
      <MenuLateral />
      {/* fim do menu lateral */}

      <div className="area-principal">
        {/* ── ÁREA PRINCIPAL ── */}
        <div className="topbar">
          <span className="topbar-breadcrumb">
            🏠 
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

          <div className="grid-stats">
            {/* 4 cards com números grandes */}
            <div className="card-stat">
              <div className="card-stat-icone">
                <i className="fa fa-users" aria-hidden="true"></i>
              </div>
              <div className="card-stat-numero">{funcionarios.length}</div>
              <div className="card-stat-texto">Funcionários</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-icone">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div className="card-stat-numero">{clientes.length}</div>
              <div className="card-stat-texto">Clientes</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-icone">
                <i className="fa fa-car" aria-hidden="true"></i>
              </div>
              <div className="card-stat-numero">{veiculos.length}</div>
              <div className="card-stat-texto">Veículos</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-icone">
                <i className="fa fa-shield" aria-hidden="true"></i>
              </div>
              <div className="card-stat-numero">{blindagens.length}</div>
              <div className="card-stat-texto">Blindagens</div>
            </div>
          </div>

          <div className="secao-titulo">Ambientes do Sistema</div>
          <div className="grid-modulos">
            <div className="card-modulo">
              <div className="card-modulo-icone">
                <i className="fa fa-users" aria-hidden="true"></i>
              </div>
              <div>
                <div className="card-modulo-nome">Funcionários</div>
                <div className="card-modulo-detalhe">Cadastro e gestão de colaboradores</div>
                <div className="card-modulo-resumo">
                  {funcionarios.length} funcionários cadastrados
                </div>
              </div>
            </div>
            <div className="card-modulo">
              <div className="card-modulo-icone">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div>
                <div className="card-modulo-nome">Clientes</div>
                <div className="card-modulo-detalhe">Cadastro e gestão de clientes</div>
                <div className="card-modulo-resumo">{clientes.length} clientes cadastrados</div>
              </div>
            </div>
            <div className="card-modulo">
              <div className="card-modulo-icone">
                <i className="fa fa-car" aria-hidden="true"></i>
              </div>
              <div>
                <div className="card-modulo-nome">Veículos</div>
                <div className="card-modulo-detalhe">Ano, placa, cor, chassi e Renavam</div>
                <div className="card-modulo-resumo">{veiculos.length} veículos cadastrados</div>
              </div>
            </div>
            <div className="card-modulo">
              <div className="card-modulo-icone">
                <i className="fa fa-shield" aria-hidden="true"></i>
              </div>
              <div>
                <div className="card-modulo-nome">Blindagens</div>
                <div className="card-modulo-detalhe">Etapas de blindagem e manutenção veicular</div>
                <div className="card-modulo-resumo">{blindagens.length} blindagens cadastradas</div>
              </div>
            </div>
          </div>
        </div>
        {/* fim do conteúdo */}
      </div>
      {/* fim da área principal */}
    </div>
  )
}
