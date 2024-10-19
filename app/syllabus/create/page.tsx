import Link from 'next/link'
import { SubmitButton } from '@/components/submit-button'
import { Label } from '@/components/ui/label'
import { SelectField, Select } from '@/components/ui/select'
import { TextAreaField, TextArea } from '@/components/ui/text-area'

import { createSyllabus } from './actions'

interface ICourseConfiguratorPageProps {
  searchParams: {
    level?: 'beginner' | 'middle' | 'advanced'
  }
}

export default function CourseConfiguratorPage({
  searchParams,
}: ICourseConfiguratorPageProps) {
  const { level } = searchParams

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
            Мы ценим Вашу индивидуальность.
            <br />
            Осветите нас своими предпочтениями
          </h1>
          <form
            action={createSyllabus}
            className="flex flex-col items-stretch gap-6"
          >
            <SelectField>
              <Label htmlFor="level">Уровень знаний</Label>
              <Select
                name="level"
                id="level"
                defaultValue={level || 'beginner'}
                required
              >
                <option
                  value="beginner"
                  disabled={level && level !== 'beginner'}
                >
                  Начинающий
                </option>
                <option value="middle" disabled={level && level !== 'middle'}>
                  Средний
                </option>
                <option
                  value="advanced"
                  disabled={level && level !== 'advanced'}
                >
                  Продвинутый
                </option>
              </Select>
              <Link
                href="/get-knowledge-level"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Пройти тест на уровень знаний
              </Link>
            </SelectField>
            <TextAreaField>
              <Label htmlFor="goal">Цели обучения</Label>
              <TextArea name="goal" id="goal" required />
            </TextAreaField>
            <SelectField>
              <Label htmlFor="course_time">Продолжительность курса</Label>
              <Select name="course_time" id="course_time" required>
                <option value="1 месяц">1 месяц</option>
                <option value="2 месяца">2 месяца</option>
                <option value="3 месяца">3 месяца</option>
              </Select>
            </SelectField>
            <SelectField>
              <Label htmlFor="time_to_study">Время на обучение в день</Label>
              <Select name="time_to_study" id="time_to_study" required>
                <option value="Менее 2 часов">Менее 2 часов</option>
                <option value="3-4 часа">3-4 часа</option>
                <option value="Более 5 часов">Более 5 часов</option>
              </Select>
            </SelectField>
            <TextAreaField>
              <Label htmlFor="extra_info">
                Дополнительные требования или предпочтения
              </Label>
              <TextArea name="extra_info" id="extra_info" />
            </TextAreaField>
            <SubmitButton className="self-end">
              Получить план обучения
            </SubmitButton>
          </form>
        </div>
      </main>
    </div>
  )
}
