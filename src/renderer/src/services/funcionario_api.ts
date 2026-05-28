const URL_BASE = 'http://localhost:8081/funcionario'

export async function Listar_funcionarios(): Promise<any> {
  try {
    const resposta = await fetch(`${URL_BASE}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    if (!resposta.ok) {
      throw new Error(`Erro no servidor: ${resposta.status}`)
    }
    return await resposta.json()
  } catch (error) {
    console.error('Erro ao buscar funcionarios:', error)
    return []
  }
}

/*export async function Cadastrar_usuario(nome_usuario: string, senha_usuario: string, email_usuario: string): Promise<any> {
  try {
    const resposta = await fetch(`${URL_BASE}/`)
  }
}*/
