import { deeplReq } from '@/app/utils'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    const result = await deeplApi(text)

    console.log({ text }, result)

    return NextResponse.json(
      { text, message: result.translations[0].text },
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
  deeplReq(`/v2/translate`, {
    method: 'post',
    body: JSON.stringify({ text: [text], target_lang: 'EN' }),
  })
