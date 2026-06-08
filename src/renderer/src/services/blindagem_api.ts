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
export async function Atualizar_blindagem(id: number, dadosAtualizar: any): Promise<any> {
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

export async function Cadastrar_blindagem(
  veiculo: string,
  nivel_blindagem: string,
  status: string
): Promise<any> {
  const resposta = await fetch(`${URL_BASE}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      veiculo: veiculo ? { placa: veiculo } : null,
      nivel_blindagem: nivel_blindagem,
      status: status
    })
  })
  if (!resposta.ok) {
    const dadosErro = await resposta.json().catch(() => null)
    if (dadosErro) {
      throw new Error(`Erro no cadastro da blindagem: ${dadosErro.mensagem || 'Erro desconhecido'}`)
    }
    throw new Error(`Erro no servidor: ${resposta.status}`)
  }
  return await resposta.json()
}

export async function Deletar_blindagem(id: number): Promise<any> {
  try {
    const resposta = await fetch(`${URL_BASE}/${id}`, {
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
    console.error('Erro ao deletar blindagem: ', error)
    return { sucesso: false, mensagem: 'Erro ao deletar blindagem.' }
  }
}
