'use client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [traslated, setTranslated] = useState('')
  return (
    <main className="p-10">
      <div>
        <textarea
          className="border w-full text-2xl p-2"
          autoFocus
          value={text}
          rows={10}
          onChange={e => {
            setText(e.target.value)
            traslate(e.target.value, setTranslated)
          }}
        ></textarea>
        <div className="mt-10">
          <pre>{traslated}</pre>
        </div>
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
}, 500)

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), timeout)
  }
}
