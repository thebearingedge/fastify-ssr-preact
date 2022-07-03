import { JSX } from 'preact'
import Head from '../components/head.js'

export default function Other(): JSX.Element {
  return (
    <>
      <Head>
        <title>Other | Node App</title>
        <meta name="description" content="this is the other page!" />
      </Head>
      <h1>This is SSR</h1>
      <p>wow...</p>
    </>
  )
}
