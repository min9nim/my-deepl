import Form from './components/icons/Form'
import { deeplReq } from './utils'

export default async function Home() {
  // const usage = await fetch(API_URL + '/api/usage').then(res => res.json())
  const usage = await deeplReq(`/v2/usage`)

  return (
    <main className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <img src="/apple-icon-144x144.png" style={{ width: 40 }} />
        <div className="text-3xl font-bold">myDeepl</div>
      </div>
      <Form usage={usage} />
    </main>
  )
}
