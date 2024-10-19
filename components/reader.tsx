import { Suspense } from 'react'

export async function Reader({
  reader,
}: {
  reader: ReadableStreamDefaultReader<any>
}) {
  const { done, value } = await reader.read()

  if (done) {
    return null
  }

  const text = new TextDecoder().decode(value)

  return (
    <span className="text-base leading-7 text-neutral-950">
      {text}
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </span>
  )
}
