// 1. Garante que a URL termina em /login (ou inclua o caminho do @RequestMapping da classe se houver)
const URL_BASE = 'http://3.16.156.201:8081/admin'

export async function login(email: string, senha: string): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // 2. Mantém estes nomes pois eles batem exatamente com o teu modelo Java!
      email_admin: email,
      senha_admin: senha
    })
  })

  if (!resposta.ok) {
    const dadosErro = await resposta.json().catch(() => null)
    if (dadosErro) {
      throw new Error(`Erro no login: ${dadosErro.mensagem || 'Erro desconhecido'}`)
    }
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }

  return await resposta.json()
}

export async function cadastro(
  nome_admin: string,
  email_admin: string,
  senha_admin: string,
  cnpj: string
): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/cadastro`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nome_admin: nome_admin,
      cnpj: cnpj,
      email_admin: email_admin,
      senha_admin: senha_admin
    })
  })
  if (!resposta.ok) {
    const dadosErro = await resposta.json().catch(() => null)
    if (dadosErro) {
      throw new Error(`Erro no cadastro: ${dadosErro.mensagem || 'Erro desconhecido'}`)
    }
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }
  return await resposta.json()
}

export async function Funcionario_cadastro(
  nome_funcionario: string,
  email: string,
  cargo: string,
  senha_funcionario: string
): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/cadastro/funcionario`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nome_funcionario: nome_funcionario,
      email: email,
      cargo: cargo,
      senha_funcionario: senha_funcionario
    })
  })
  if (!resposta.ok) {
    const dadosErro = await resposta.json().catch(() => null)
    if (dadosErro) {
      throw new Error(
        `Erro no cadastro do funcionário: ${dadosErro.mensagem || 'Erros desconhecido'}`
      )
    }
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }
  return await resposta.json()
}

export async function Cadastrar_cliente(
  nome_usuario: string,
  email_usuario: string,
  senha_usuario: string
): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/cadastro/cliente`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      nome_usuario: nome_usuario,
      email_usuario: email_usuario,
      senha_usuario: senha_usuario
    })
  })
  if (!resposta.ok) {
    const dadosErro = await resposta.json().catch(() => null)
    if (dadosErro) {
      throw new Error(`Erro no cadastro do cliente: ${dadosErro.mensagem || 'Erro desconhecido'}`)
    }
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }
  return await resposta.json()
}

export async function Cadastrar_veiculo(
  cor: string,
  modelo: string,
  placa: string,
  ano_veiculo: number,
  id_usuario: string
): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/cadastro/veiculo`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      cor: cor,
      modelo: modelo,
      ano_veiculo: ano_veiculo,
      placa: placa,
      usuario: id_usuario ? { id_usuario: parseInt(id_usuario) } : null
    })
  })
  if (!resposta.ok) {
    const dadosErro = await resposta.json().catch(() => null)
    if (dadosErro) {
      throw new Error(`Erro no cadastro do veículo: ${dadosErro.mensagem || 'Erro desconhecido'}`)
    }
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }
  return await resposta.json()
}
