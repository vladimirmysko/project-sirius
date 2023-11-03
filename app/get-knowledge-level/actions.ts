'use server'

import OpenAI from 'openai'
import { redirect } from 'next/navigation'

export async function getKnowledgeLevel(formData: FormData) {
  const question0 = formData.get('question-0')
  const answer0 = formData.get('answer-0')

  const question1 = formData.get('question-1')
  const answer1 = formData.get('answer-1')

  const question2 = formData.get('question-2')
  const answer2 = formData.get('answer-2')

  const question3 = formData.get('question-3')
  const answer3 = formData.get('answer-3')

  const question4 = formData.get('question-4')
  const answer4 = formData.get('answer-4')

  console.log({
    first: { question0, answer0 },
    second: { question1, answer1 },
    third: { question2, answer2 },
    fouth: { question3, answer3 },
    fifth: { question4, answer4 },
  })

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const content = `Студент хочет получить учебный план по предмету python. Один из параметров для получения учебного плана - это уровень знаний по предмету. Он прошел тестирование по предмету на определения уровня знания. Я предоставлю вопрос и ответ от студента.
  
  Вопрос 1: ${question0}
  Ответ 1: ${answer0}
  
  Вопрос 2: ${question0}
  Ответ 2: ${answer0}
  
  Вопрос 3: ${question0}
  Ответ 3: ${answer0}
  
  Вопрос 4: ${question0}
  Ответ 4: ${answer0}
  
  Вопрос 5: ${question0}
  Ответ 5: ${answer0}
  
  На основе этиз данных определи уровень знания по предмету python. Твой ответ должен содержать одно слово: beginner, middle, advanced.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: false,
    messages: [
      {
        role: 'user',
        content,
      },
    ],
  })

  redirect(
    `/course-configurator?level=${response.choices[0].message.content}&subject=python`,
  )
}
