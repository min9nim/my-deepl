import { deeplReq } from '@/app/utils'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const result = await deeplReq(`/v2/usage`, {
      method: 'get',
    })
    return NextResponse.json(result, {
      status: 200,
    })
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      {
        status: 400,
      },
    )
  }
}
