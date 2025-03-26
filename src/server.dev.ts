import express, {Request, Response} from 'express'
import {DataResponse} from './infrastructure/api/schemas/responses'

const app = express()
app.disable('x-powered-by')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.get('/', function (req: Request, res: Response) {
  const urls = [
    {
      method: 'GET',
      path: '/api/template',
    },
  ]

  const htmlResponse = `
    <h1>Servidor de desenvolvimento</h1>
    <p>URLs disponíveis:</p>
    <ul>${urls
      .map(
        url => `<li>${url.method}: <a href="${url.path}">${url.path}</a></li>`,
      )
      .join('')}</ul>
      <br/>
      <p>Adicione os endpoints necessários em: src/server.dev.ts</p>
  `

  res.send(htmlResponse)
})

app.get('/api/template/*', async function (req: Request, res: Response) {
  const templateExample = {
    id: req.params.id,
    descricao:
      'dado recebido via api de desenvolvimento: http://localhost:5002',
  }

  res.json(await processaResposta(templateExample))
})

app.listen(5002, () => {
  console.log(
    '\x1b[1m\x1b[33m%s\x1b[0m',
    'Servidor de desenvolvimento executando em http://localhost:5002',
  )
})

async function processaResposta<T>(data: T) {
  const response: DataResponse<T> = {
    data,
  }
  return new Promise(resolve => setTimeout(() => resolve(response), 1000))
}
