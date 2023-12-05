import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    // const result = await deeplApi(text)
    // console.log(result)

    return NextResponse.json(
      { message: text + '\n\n' + text },
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
  fetch(`https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'LMT_handle_jobs',
      params: {
        jobs: [
          {
            kind: 'default',
            sentences: [{ text, id: 1, prefix: '' }],
            raw_en_context_before: [],
            raw_en_context_after: [],
            preferred_num_beams: 4,
            quality: 'fast',
          },
        ],
        lang: {
          target_lang: 'EN',
          preference: {
            weight: {
              DE: 0.13683,
              EN: 4.36896,
              ES: 0.10062,
              FR: 0.11709,
              IT: 0.07283,
              JA: 0.07654,
              NL: 0.07403,
              PL: 0.06941,
              PT: 0.06633,
              RU: 0.07474,
              ZH: 0.06666,
              BG: 0.05156,
              CS: 0.05317,
              DA: 0.05052,
              EL: 0.0488,
              ET: 0.04862,
              FI: 0.05556,
              HU: 0.04994,
              ID: 0.04914,
              LV: 0.03945,
              LT: 0.04608,
              RO: 0.04869,
              SK: 0.04841,
              SL: 0.0472,
              SV: 0.05872,
              TR: 0.0505,
              UK: 0.05918,
              KO: 12.90118,
              NB: 0.05554,
            },
            default: 'default',
          },
          source_lang_user_selected: 'auto',
        },
        priority: -1,
        commonJobParams: {
          regionalVariant: 'en-US',
          mode: 'translate',
          textType: 'plaintext',
          browserType: 1,
        },
        timestamp: 1701784480969,
      },
      id: 11050016,
    }),
  }).then(res => res.json())
