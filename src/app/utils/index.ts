export const copyToClipboard = val => {
  let t = document.createElement('textarea')
  document.body.appendChild(t)
  t.value = val
  t.select()
  document.execCommand('copy')
  document.body.removeChild(t)
}

export const deeplReq = (path, option) =>
  fetch(`https://api-free.deepl.com${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `DeepL-Auth-Key ${process.env.API_KEY}`,
    },
    ...option,
  }).then(res => res.json())
