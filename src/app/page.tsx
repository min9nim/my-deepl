'use client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [traslated, setTranslated] = useState('')
  return (
    <main className="p-4">
      <div>
        <textarea
          className="border"
          value={text}
          rows={10}
          cols={100}
          onChange={e => {
            setText(e.target.value)
            traslate(e.target.value, setTranslated)
          }}
        ></textarea>
        <pre>{traslated}</pre>
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
