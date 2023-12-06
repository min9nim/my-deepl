'use client'
import { useState } from 'react'
import IconCopy from './components/icons/IconCopy'
import { copyToClipboard } from './utils'
import toast from 'react-hot-toast'

export default function Home() {
  const [traslated, setTranslated] = useState('')
  return (
    <main className="p-4">
      <div className="text-2xl">
        <textarea
          className="border w-full p-2"
          autoFocus
          rows={5}
          onChange={e => {
            traslate(e.target.value, setTranslated)
          }}
        ></textarea>
        {traslated && (
          <div className="mt-10 flex">
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
        )}
      </div>
    </main>
  )
}

const traslate = debounce(async (text, setTranslated) => {
  const result = await fetch('/api/translate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).then(res => res.json())
  setTranslated(result.message)
}, 2000)

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), timeout)
  }
}
