import 'dotenv/config'
import path from 'path'
import fastify from 'fastify'
import render from 'preact-render-to-string'
import { ComponentChildren, JSX } from 'preact'
import Head, { HeadProvider } from '../components/head.js'

const app = fastify()

type PageComponent = {
  default: () => JSX.Element
}

async function loadPage(route: string): Promise<PageComponent | null> {
  const url = new URL(path.join('../pages', `${route}.js`), import.meta.url)
  try {
    return await import(url.pathname)
  } catch {
    return null
  }
}

app.get<{ Params: { '*': string } }>('*', async (req, res) => {
  let { '*': route } = req.params
  if (route.endsWith('/')) {
    route = path.join(route, 'index')
  }
  const Page = (await loadPage(route))?.default
  if (Page == null) {
    res.status(404)
    res.send()
    return
  }
  const headTags: ComponentChildren[][] = []
  const body = render(
    <HeadProvider tags={headTags}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Page />
      </body>
    </HeadProvider>
  )
  const head = render(<head>{headTags}</head>)
  res
    .header('content-type', 'text/html')
    .send(`<!doctype html><html lang="en">${head}${body}</html>`)
})

await app.listen({ port: Number(process.env.PORT) })

console.log(app.server.address())
