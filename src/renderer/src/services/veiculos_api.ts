const URL_BASE = 'http://3.16.156.201:8081/veiculo'

export async function Listar_veiculos(): Promise<any> {
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
    console.error('Erro ao buscar veiculos: ', error)
    return []
  }
}

export async function Deletar_veiculo(placa: string): Promise<any> {
  try {
    const resposta = await fetch(`${URL_BASE}/${placa}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    if (!resposta.ok) {
      throw new Error(`Erro no servidor: ${resposta.status}`)
    }
    return await resposta.json()
  } catch (error) {
    console.error('Erro ao deletar veiculo: ', error)
    return { sucesso: false, mensagem: 'Erro ao deletar veículo.' }
  }
}

export async function Atualizar_veiculo(placa: string, dadosAtualizar: any): Promise<any> {
  const resposta = await fetch(`${URL_BASE}/${placa}`, {
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
