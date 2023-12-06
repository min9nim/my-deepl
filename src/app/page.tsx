'use client'
import { useState } from 'react'
import IconCopy from './components/icons/IconCopy'
import { copyToClipboard } from './utils'
import toast from 'react-hot-toast'

export default function Home() {
  const [traslated, setTranslated] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <main className="p-4">
      <div className="text-2xl">
        <div className="mb-10">
          <textarea
            className="border w-full p-4"
            autoFocus
            rows={5}
            onChange={e => {
              traslate(e.target.value, setTranslated, setLoading)
            }}
          />
        </div>
        {loading ? (
          <div className="animate-bounce">Loading..</div>
        ) : (
          traslated && (
            <div className="flex bg-gray-50	p-4">
              <pre>{traslated}</pre>
              <div
                className="inline cursor-pointer hover:scale-110"
                onClick={() => {
                  copyToClipboard(traslated)
                  toast.success('copied')
                }}
              >
                <IconCopy size={22} />
              </div>
            </div>
          )
        )}
      </div>
    </main>
  )
}

const traslate = debounce(async (text, setTranslated, setLoading) => {
  setLoading(true)
  const result = await fetch('/api/translate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).then(res => res.json())
  setLoading(false)
  setTranslated(result.message)
}, 2000)

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), timeout)
  }
}
