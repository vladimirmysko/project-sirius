'use server'

import { redirect } from 'next/navigation'
import OpenAI from 'openai'
import { prisma } from '@/lib/prisma'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function createSyllabus(formData: FormData) {
  const level = formData.get('level')
  const goal = formData.get('goal')
  const courseTime = formData.get('course_time')
  const timeToStudy = formData.get('time_to_study')
  const extraInfo = formData.get('extra_info')

  const content = `Ты препадаватель мирового уровня по предмету "Язык программирования Python". Студент хочет получить учебный план исходя из нескольких параметров:
  - Уровень знаний по предмету: ${level};
  - Цели обучения: ${goal};
  - Продолжительность курса: ${courseTime};
  - Время на обучение в день: ${timeToStudy};
  - Дополнительные требования или предпочтения: ${extraInfo}.
  
  На основе этой информации составь мне учебный план. Твой ответ должен быть в формате JSON, без лишних слов.
  В примере ниже будут значения в ключе "_comment" - это значение означает коментарии, который даст тебе больше информации о структуре.
  Ключи должны называться именно так, как на примере ниже.
  
  Пример JSON:
  {
    "month": [
        {
            "_comment": "объект представляет собой один месяц",
            "weeks": [
                {
                    "_comment": "объект представляет собой одну неделю",
                    "theme": "Повторение основ Python",
                    "contents": [
                        "Синтаксис Python",
                        "Переменные, типы данных, операции с данными",
                        "Управляющие конструкции: условные операторы, циклы",
                        "Основы работы с функциями",
                        "Работа с ошибками и исключениями"
                    ]
                },
            ],
        }
    ],
  }

  JSON представлен следующий объект:
  - Ключ "month" ассоциирован с массивом, который содержит объекты для каждого месяца.
  - Ключ "weeks" ассоциирован с массивом объектов. Каждый объект представляет собой одну неделю.
  - Внутри объекта недели:
    Ключ "theme" содержит строку, которая является темой недели ("Повторение основ Python").
    Ключ "contents" ассоциирован с массивом строк, которые перечисляют темы или активности, запланированные на эту неделю.
  `

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

  const syllabus: {
    month: { weeks: { theme: string; contents: string[] }[] }[]
  } = JSON.parse(response.choices[0].message.content!)

  const createdSyllabus = await prisma.syllabus.create({
    data: { subject: 'Язык программирования Python' },
  })

  for (const month of syllabus.month) {
    const createdMonth = await prisma.month.create({
      data: { syllabusId: createdSyllabus.id },
    })

    for (const week of month.weeks) {
      const createdWeek = await prisma.week.create({
        data: { theme: week.theme, monthId: createdMonth.id },
      })

      const contents = week.contents.map((c) => ({
        text: c,
        weekId: createdWeek.id,
      }))

      await prisma.content.createMany({ data: contents })
    }
  }

  redirect(`/syllabus/${createdSyllabus.id}`)
}
