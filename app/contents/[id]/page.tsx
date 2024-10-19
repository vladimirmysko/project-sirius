import { Suspense } from 'react'
import OpenAI from 'openai'
import { OpenAIStream } from 'ai'

import { prisma } from '@/lib/prisma'
import { Reader } from '@/components/reader'

interface IContentPageProps {
  params: { id: string }
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export default async function ContentPage({ params }: IContentPageProps) {
  const { id } = params
  const content = await prisma.content.findUnique({ where: { id: Number(id) } })

  if (!content) {
    throw new Error('Записи нет')
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    temperature: 0.8,
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Студент учится по предмету "Язык программирования Python".
        Твоя задача написать объяснить тему "${content.text}".
        Твой ответ должен содержать только объяснение темы.
        Объяснение должно быть большого объема и старайся разбавить объяснение примерами и достоверными фактами.
        Объяснение должно быть отформатированно в удобочитаемый вид.`,
      },
    ],
  })

  const stream = OpenAIStream(response)

  const reader = stream.getReader()

  return (
    <div className="flex min-h-screen flex-col items-stretch bg-white">
      <header className="flex h-16 flex-row items-center justify-center">
        <span className="text-lg font-semibold text-neutral-950">
          Project Sirius
        </span>
      </header>
      <main className="flex flex-col items-center px-4 py-8">
        <div className="flex w-full max-w-md flex-col items-stretch gap-8">
          <h1 className="text-center text-xl font-semibold text-neutral-950">
            {content.text}
          </h1>
          <Suspense>
            <Reader reader={reader} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
