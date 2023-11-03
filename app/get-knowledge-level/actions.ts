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

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const content = `Студент хочет получить учебный план по предмету 'Язык программирование Python'. Один из параметров для получения учебного плана - это уровень знаний по предмету. Он прошел тестирование по предмету на определения уровня знания. Я предоставлю вопрос и ответ от студента.
  
  ---
  Вопрос 1: ${question0}
  Ответ 1: ${answer0}
  
  Вопрос 2: ${question1}
  Ответ 2: ${answer1}
  
  Вопрос 3: ${question2}
  Ответ 3: ${answer2}
  
  Вопрос 4: ${question3}
  Ответ 4: ${answer3}
  
  Вопрос 5: ${question4}
  Ответ 5: ${answer4}
  ---
  
  На основе этиз данных определи уровень знания по предмету 'Язык программирование Python'. Твой ответ должен содержать одно слово: beginner, middle, advanced. Beginner - это начинающий. Middle - это средний. Advanced - это продвинутый.`

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

  redirect(`/syllabus/create?level=${response.choices[0].message.content}`)
}
