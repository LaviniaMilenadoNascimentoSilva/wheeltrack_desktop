const URL_BASE = 'http://3.16.156.201:8081/manutencao'

export async function Listar_manutencao(): Promise<any> {
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
    console.log('Erro ao buscar manutenções: ', error)
    return []
  }
}

export async function Cadastrar_manutenção(): Promise<any>{
  const resposta = await fetch(`${URL_BASE}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  })
}