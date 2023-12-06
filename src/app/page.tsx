'use client'
import { useRef, useState } from 'react'
import IconCopy from './components/icons/IconCopy'
import { copyToClipboard } from './utils'
import toast from 'react-hot-toast'
import IconPaste from './components/icons/IconPaste'

export default function Home() {
  const taRef = useRef<HTMLTextAreaElement>(null)
  const [traslated, setTranslated] = useState('')
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  return (
    <main className="p-4">
      <div className="text-2xl">
        <div className="flex mb-10">
          <textarea
            ref={taRef}
            value={text}
            className="border w-full p-4"
            autoFocus
            rows={5}
            onChange={e => {
              setText(e.target.value)
              traslate(e.target.value, setTranslated, setLoading)
            }}
          />
          <div
            className="inline cursor-pointer hover:scale-110"
            onClick={() => {
              navigator.clipboard
                .readText()
                .then(text => {
                  setText(text)
                  console.log('Pasted content: ', text)
                })
                .catch(err => {
                  console.error('Failed to read clipboard contents: ', err)
                })
            }}
          >
            <IconPaste size={42} />
          </div>
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
