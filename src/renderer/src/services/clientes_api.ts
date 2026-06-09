const URL_BASE = 'http://3.16.156.201:8081/usuario'

export async function Listar_clientes(): Promise<any> {
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
    console.error('Erro ao buscar clientes: ', error)
    return []
  }
}

export async function Atualizar_cliente(id: number, dadosAtualizar: any): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(dadosAtualizar)
  })
  if (!resposta.ok) {
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }
  return await resposta.json()
}
