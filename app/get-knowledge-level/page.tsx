import OpenAI from 'openai'

import { SubmitButton } from '@/components/submit-button'
import { Label } from '@/components/ui/label'
import { TextAreaField, TextArea } from '@/components/ui/text-area'

import { getKnowledgeLevel } from './actions'

export default async function GetKnowledgeLevelPage() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const content = `Составь мне тест для оценки уровня знаний студента по предмету 'Язык программирование Python' на русском языке. Тест должен состоять из 5 вопросов и быть с открытыми вариантами ответа, то есть в тесте должны быть вопросы без вариантов ответа. Пользователь будет отвечать сам в текстовом блоке. Твой ответ должен содержать только структуру теста в формате JSON, без лишних слов. В структуре JSON ключ "questions" - это массив строк вопросов в двойных кавычках. Пример вопроса: "Как операторы 'is' и '==' отличаются друг от друга в Python?".

  Структура JSON:
  {
    title,
    questions: []
  }`

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  })

  const test: {
    title: string
    questions: string[]
  } = JSON.parse(response.choices[0].message.content!)

  return (
    <div className="flex min-h-screen flex-col items-stretch bg-white">
      <header className="flex h-16 flex-row items-center justify-center">
        <span className="text-lg font-semibold text-neutral-950">
          Project Sirius
        </span>
      </header>
      <main className="flex flex-col items-center py-8">
        <div className="flex w-full max-w-md flex-col items-stretch gap-8">
          <h1 className="text-center text-xl font-semibold text-neutral-950">
            {test.title}
          </h1>
          <form
            className="flex flex-col items-stretch gap-6"
            action={getKnowledgeLevel}
          >
            {test.questions.map((question, index) => (
              <TextAreaField key={`question-${index}`}>
                <input
                  type="hidden"
                  value={question}
                  name={`question-${index}`}
                />
                <Label htmlFor={`answer-${index}`} className="text-lg">
                  {question}
                </Label>
                <TextArea
                  name={`answer-${index}`}
                  id={`answer-${index}`}
                  required
                />
              </TextAreaField>
            ))}
            <SubmitButton className="self-end">Закончить экзамен</SubmitButton>
          </form>
        </div>
      </main>
    </div>
  )
}
