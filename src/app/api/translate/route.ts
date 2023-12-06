import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    const result = await deeplApi(text)

    console.log({ text }, result)

    return NextResponse.json(
      { message: text + '\n---\n' + result.translations[0].text },
      {
        status: 200,
      },
    )
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      {
        status: 400,
      },
    )
  }
}

const deeplApi = text =>
  fetch(`https://api-free.deepl.com/v2/translate`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `DeepL-Auth-Key ${process.env.API_KEY}`,
    },
    body: JSON.stringify({ text: [text], target_lang: 'EN' }),
  }).then(res => res.json())
