import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { SelectField, Select } from '@/components/ui/select'
import { TextAreaField, TextArea } from '@/components/ui/text-area'
import { Button } from '@/components/ui/button'

interface ICourseConfiguratorPageProps {
  searchParams: {
    subject?: 'python' | 'history'
    level?: 'beginner' | 'middle' | 'advanced'
  }
}

export default function CourseConfiguratorPage({
  searchParams,
}: ICourseConfiguratorPageProps) {
  const { subject, level } = searchParams

  if (!subject) {
    throw new Error('Нужен параметр subject в строке запроса')
  }

  let goalOptions: string[] = []

  if (subject === 'python') {
    goalOptions = [
      'Освоение основ программирования',
      'Разработка веб-приложений',
      'Анализ данных',
      'Машинное обучение',
    ]
  } else {
    goalOptions = [
      'Вспомнить школьную программу',
      'История возникновения',
      'Период становления',
    ]
  }

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
            Мы ценим Вашу индивидуальность.
            <br />
            Осветите нас своими предпочтениями
          </h1>
          <form className="flex flex-col items-stretch gap-6">
            <SelectField>
              <Label htmlFor="level">Уровень знаний</Label>
              <Select
                name="level"
                id="level"
                disabled={level !== undefined}
                defaultValue={level}
              >
                <option value="beginner">Начинающий</option>
                <option value="middle">Средний</option>
                <option value="advanced">Продвинутый</option>
              </Select>
              <Link
                href="/get-knowledge-level?subject=python"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Пройти тест на уровень знаний
              </Link>
            </SelectField>
            <SelectField>
              <Label htmlFor="goal">Цель обучения</Label>
              <Select name="goal" id="goal">
                {goalOptions.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </Select>
            </SelectField>
            <SelectField>
              <Label htmlFor="course_time">Продолжительность курса</Label>
              <Select name="course_time" id="course_time">
                <option value="three_month">3 месяца</option>
                <option value="six_month">6 месяцев</option>
              </Select>
            </SelectField>
            <SelectField>
              <Label htmlFor="time_to_study">Время на обучение в день</Label>
              <Select name="time_to_study" id="time_to_study">
                <option value="two_or_less_hours">Менее 2 часов</option>
                <option value="three_or_four_hours">3-4 часа</option>
                <option value="five_or_more_hours">Более 5 часов</option>
              </Select>
            </SelectField>
            <TextAreaField>
              <Label htmlFor="extra_info">
                Дополнительные требования или предпочтения
              </Label>
              <TextArea name="extra_info" id="extra_info" />
            </TextAreaField>
            <Button className="self-end" type="submit">
              Получить план обучения
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
