const URL_BASE = 'http://3.16.156.201:8081/documento'

export async function Listar_documentos(): Promise<any> {
  try {
    const resposta = await fetch(`${URL_BASE}`, {
      method: 'GET',
      headers: {
        'constent-type': 'application/json'
      }
    })
    if (!resposta.ok) {
      throw new Error(`Erro no servidor: ${resposta.status}`)
    }
    return await resposta.json()
  } catch (error) {
    console.error('Erro so buscar documentos: ', error)
    return []
  }
}

export async function Cadastrar_documento(
  file: File, // O arquivo binário pego do <input type="file" />
  tipo_documento: string, // O tipo do documento (Ex: "Laudo", "Termo")
  id_funcionario: number, // O ID do funcionário (já convertido com parseInt)
  placa_veiculo: string // A string da placa do veículo
): Promise<any> {
  // Cria o container FormData para enviar como Multipart Form Data (igual ao Hoppscotch)
  const dadosFormulario = new FormData()

  // Vincula as chaves exatamente com os nomes dos @RequestParam do seu Java
  dadosFormulario.append('file', file)
  dadosFormulario.append('tipo_documento', tipo_documento)
  dadosFormulario.append('id_funcionario', id_funcionario.toString())
  dadosFormulario.append('placa_veiculo', placa_veiculo)

  // Faz a requisição para o endpoint de upload
  const resposta = await fetch(`${URL_BASE}/upload`, {
    method: 'POST',
    body: dadosFormulario // O próprio navegador configura o Content-Type correto!
  })

  if (!resposta.ok) {
    // Como o Java pode retornar um texto de erro puro, capturamos como text() para não quebrar o Front
    const textoErro = await resposta.text().catch(() => null)
    throw new Error(`Erro no servidor: ${resposta.status} - ${textoErro || 'Erro desconhecido'}`)
  }

  // Como o seu Java retorna uma String ("Documento enviado com sucesso"), lemos como text()
  return await resposta.text()
}
