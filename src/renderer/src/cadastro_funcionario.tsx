import React, { useState, useEffect } from 'react'
import './assets/css/funcionarios.css' // Importação vital para o estilo funcionar
import MenuLateral from './menuLateral'
import { useNavigate } from 'react-router-dom'
import { Funcionario_cadastro } from './services/Adm_api'

export default function CadastroFuncionarios() {
  const [nome_funcionario, setNome_funcionario] = useState('')
  const [email, setEmail] = useState('')
  const [cargo, setCargo] = useState('')
  const [senha_funcionario, setSenha_funcionario] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const navigate = useNavigate()

  const lidarCadastro = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setErro(null)

    if (!nome_funcionario.trim() || !email.trim() || !cargo.trim() || !senha_funcionario.trim()) {
      setErro('Por favor, preencha todos os campos.')
      setTimeout(() => setErro(null), 3000)
      return
    }
    try {
      const resposta = await Funcionario_cadastro(nome_funcionario, email, cargo, senha_funcionario)
      console.log('Sucesso ao cadastrar: ', resposta)
      if (resposta.sucesso) {
        setErro('Cadastro bem-sucedido!')
        setTimeout(() => setErro(null), 3000)
      } else {
        setErro(resposta.mensagem)
        setTimeout(() => setErro(null), 3000)
      }
    } catch (error) {
      console.error('Erro ao cadastrar: ', error)
      setErro('Erro ao cadastrar funcionário.')
      setTimeout(() => setErro(null), 3000)
    }
  }

  return (
    <div className="tela-inteira">
      <MenuLateral />
      <div className="pagina">
        <h1>Cadastro de funcionario</h1>
      </div>
    </div>
  )
}
