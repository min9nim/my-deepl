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
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <pre>{traslated}</pre>
      </div>
    </main>
  )
}
