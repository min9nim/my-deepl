'use client'

import { copyToClipboard, debounce } from '@/app/utils'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import IconClear from './IconClear'
import IconCopy from './IconCopy'
import IconPaste from './IconPaste'

export default function Form({ usage }) {
  const taRef = useRef<HTMLTextAreaElement>(null)
  const [traslated, setTranslated] = useState('')
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')

  return (
    <div>
      <div className="text-base">
        <div className="flex mb-10 flex-col">
          <textarea
            ref={taRef}
            value={text}
            className="border w-full p-4 border-gray-200"
            autoFocus
            rows={5}
            onChange={e => {
              if (!taRef.current) {
                return
              }
              // taRef.current.style.height = 'auto'
              taRef.current.style.height = `${taRef.current.scrollHeight}px`
              const value = e.target.value
              setText(value)
              traslate(value, setTranslated, setLoading)
            }}
          />
          <div className="flex flex-row	items-center justify-between	">
            <div className="flex items-center">
              <div
                className="inline cursor-pointer hover:scale-110"
                onClick={() => {
                  navigator.clipboard
                    .readText()
                    .then(text => {
                      const value = text.trim()
                      setText(value)
                      traslate(value, setTranslated, setLoading)
                    })
                    .catch(err => {
                      console.error('Failed to read clipboard contents: ', err)
                    })
                }}
              >
                <IconPaste size={42} />
              </div>
              <div
                className="inline cursor-pointer hover:scale-110"
                onClick={() => {
                  setText('')
                  setTranslated('')
                }}
              >
                <IconClear size={38} />
              </div>
            </div>
            <div>
              {`- Usage: ${usage.character_count.toLocaleString()} / ${usage.character_limit.toLocaleString()}`}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="animate-bounce">Loading..</div>
        ) : (
          traslated && (
            <div className="flex flex-col">
              <div className="flex bg-gray-50	p-4 mr-4 w-full">
                <pre className="break-words whitespace-pre-wrap	">
                  {traslated}
                </pre>
              </div>
              <div
                className="inline cursor-pointer hover:scale-110 p-2 flex justify-center flex-col"
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
    </div>
  )
}

const traslate = debounce(async (text, setTranslated, setLoading) => {
  const value = text.trim()
  if (!value) {
    setTranslated('')
    return
  }
  setLoading(true)
  const result = await fetch('/api/translate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: value }),
  }).then(res => res.json())
  setLoading(false)
  setTranslated(result.message)
}, 1500)
