import React, { useState } from "react";
import "./Funcionarios.css"; // Importação vital para o estilo funcionar

export default function Funcionarios() {
  const [aba, setAba] = useState("lista");
  const [busca, setBusca] = useState("");
  
  // Exemplo de estado inicial
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: "Carlos Eduardo Souza", cpf: "123.456.789-00", cargo: "Técnico", status: "Ativo" },
    { id: 2, nome: "Ana Beatriz Lima", cpf: "987.654.321-00", cargo: "Supervisora", status: "Ativo" }
  ]);

  const funcionariosFiltrados = funcionarios.filter(f => 
    f.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina">
      <header className="cabecalho">
        <div>
          <h1 className="cabecalho-titulo">Funcionários</h1>
          <p className="cabecalho-subtitulo">Gestão de colaboradores cadastrados</p>
        </div>
        <button className="btn-primario" onClick={() => setAba("cadastro")}>
          + Novo Funcionário
        </button>
      </header>

      <nav className="abas">
        <button 
          className={`aba ${aba === "lista" ? "aba-ativa" : ""}`} 
          onClick={() => setAba("lista")}
        >
          Lista de Funcionários
        </button>
        <button 
          className={`aba ${aba === "cadastro" ? "aba-ativa" : ""}`} 
          onClick={() => setAba("cadastro")}
        >
          Cadastro
        </button>
      </nav>

      {aba === "lista" ? (
        <>
          <div className="grid-3">
            <div className="card-total">
              <div className="card-total-icone verde">👥</div>
              <div className="card-total-numero">{funcionarios.length}</div>
              <div className="card-total-texto">Total</div>
            </div>
            <div className="card-total">
              <div className="card-total-icone verde">✅</div>
              <div className="card-total-numero">{funcionarios.filter(f => f.status === "Ativo").length}</div>
              <div className="card-total-texto">Ativos</div>
            </div>
            <div className="card-total">
              <div className="card-total-icone vermelho">❌</div>
              <div className="card-total-numero">{funcionarios.filter(f => f.status === "Inativo").length}</div>
              <div className="card-total-texto">Inativos</div>
            </div>
          </div>

          <div className="barra-busca-row">
            <input 
              className="input-busca" 
              placeholder="Buscar por nome..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="tabela-container">
            <table className="tabela">
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CPF</th>
                  <th>CARGO</th>
                  <th>STATUS</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {funcionariosFiltrados.map(f => (
                  <tr key={f.id}>
                    <td>{f.nome}</td>
                    <td>{f.cpf}</td>
                    <td>{f.cargo}</td>
                    <td>
                      <span className={`badge ${f.status === "Ativo" ? "badge-ativo" : "badge-inativo"}`}>
                        {f.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-acao">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="formulario-simples">
          {/* Conteúdo do formulário viria aqui */}
          <p>Tela de Cadastro em desenvolvimento...</p>
          <button className="btn-primario" onClick={() => setAba("lista")}>Voltar</button>
        </div>
      )}
    </div>
  );
}