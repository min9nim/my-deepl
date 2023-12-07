export default async function Usage() {
  const { character_count, character_limit } = await fetch('/api/usage').then(
    res => res.json(),
  )
  return (
    <div>
      {`- Usage: ${character_count.toLocaleString()} / ${character_limit.toLocaleString()}`}
    </div>
  )
}
