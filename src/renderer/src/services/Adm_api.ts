// 1. Garante que a URL termina em /login (ou inclua o caminho do @RequestMapping da classe se houver)
const URL_BASE = 'http://localhost:8081/api/admin'

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
