const URL_BASE = 'http://localhost:8081/api/funcionario'

export async function Listar(): Promise<any> {
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

