const URL_BASE = 'http://localhost:8081/blindagem'

export async function Listar_blindagens(): Promise<any> {
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
    console.log('Erro ao buscar blindagens: ', error)
    return []
  }
}
