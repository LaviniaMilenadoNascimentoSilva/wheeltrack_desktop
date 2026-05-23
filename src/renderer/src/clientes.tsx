import React, { useState } from 'react';
import './Clientes.css';

interface Cliente { // Interface para organizar os dados do cliente
  id: number;
  nome: string;
  documento: string; // CPF ou CNPJ
  cidade: string;
  veiculos: number;
  status: 'Ativo' | 'Inativo';
}

export default function Clientes() {
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'cadastro'>('lista');
  const [busca, setBusca] = useState('');

  const clientes: Cliente[] = [ // Exemplo de dados (na prática viriam de uma API)
    { id: 1, nome: "João Pedro Almeida", documento: "111.222.333-44", cidade: "São Paulo / SP", veiculos: 2, status: 'Ativo' },
    { id: 2, nome: "Transportadora Veloz", documento: "12.345.678/0001-90", cidade: "Guarulhos / SP", veiculos: 12, status: 'Ativo' },
  ];

  return (
    <div className="pagina-container">
      <header className="cabecalho-clientes">
        <div>
          <h1 className="titulo-secao">Gestão de Clientes</h1>
          <p className="subtitulo-secao">Administre a base de clientes e frotas vinculadas</p>
        </div>
        <button className="btn-novo" onClick={() => setAbaAtiva('cadastro')}>
          + Novo Cliente
        </button>
      </header>

      <div className="abas-navegacao">   {/* Navegação entre abas */}
        <button 
          className={`aba-link ${abaAtiva === 'lista' ? 'ativa' : ''}`}
          onClick={() => setAbaAtiva('lista')}
        >
          Lista de Clientes
        </button>
        <button 
          className={`aba-link ${abaAtiva === 'cadastro' ? 'ativa' : ''}`}
          onClick={() => setAbaAtiva('cadastro')}
        >
          Cadastrar Novo
        </button>
      </div>

      <main className="conteudo-dinamico">
        {abaAtiva === 'lista' ? (
          <section className="sessao-lista">
            <div className="barra-filtro">
              <input 
                type="text" 
                placeholder="Buscar por nome ou documento..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-busca"
              />
            </div>

            <div className="tabela-wrapper">
              <table className="tabela-clientes">
                <thead>
                  <tr>
                    <th>NOME / RAZÃO SOCIAL</th>
                    <th>CPF / CNPJ</th>
                    <th>CIDADE</th>
                    <th>VEÍCULOS</th>
                    <th>STATUS</th>
                    <th className="txt-dir">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(c => (
                    <tr key={c.id}>
                      <td><strong>{c.nome}</strong></td>
                      <td>{c.documento}</td>
                      <td>{c.cidade}</td>
                      <td className="txt-destaque">{c.veiculos} unidades</td>
                      <td><span className={`tag-status ${c.status.toLowerCase()}`}>{c.status}</span></td>
                      <td className="txt-dir">
                        <button className="btn-mini">✏️</button>
                        <button className="btn-mini del">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="sessao-cadastro">
            <div className="card-form">
              <h3 className="titulo-card">Dados Cadastrais</h3>
              <div className="grid-form">
                <div className="campo-grupo">
                  <label>Nome Completo ou Razão Social</label>
                  <input type="text" placeholder="Digite o nome" />
                </div>
                <div className="campo-grupo">
                  <label>CPF ou CNPJ</label>
                  <input type="text" placeholder="00.000.000/0000-00" />
                </div>
                <div className="campo-grupo">
                  <label>E-mail de Contato</label>
                  <input type="email" placeholder="cliente@email.com" />
                </div>
                <div className="campo-grupo">
                  <label>Telefone / WhatsApp</label>
                  <input type="text" placeholder="(00) 00000-0000" />
                </div>
              </div>
              
              <div className="acoes-form">
                <button className="btn-cancelar" onClick={() => setAbaAtiva('lista')}>Cancelar</button>
                <button className="btn-confirmar">Salvar Cliente</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};