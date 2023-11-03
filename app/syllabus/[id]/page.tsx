import Link from 'next/link'
import { prisma } from '@/lib/prisma'

interface ISyllabusPageProps {
  params: { id: string }
}

export default async function SyllabusPage({ params }: ISyllabusPageProps) {
  const { id } = params

  const syllabus = await prisma.syllabus.findUnique({
    where: { id },
    include: {
      months: { include: { weeks: { include: { contents: true } } } },
    },
  })

  return (
    <div className="flex min-h-screen flex-col items-stretch bg-white">
      <header className="flex h-16 flex-row items-center justify-center">
        <span className="text-lg font-semibold text-neutral-950">
          Project Sirius
        </span>
      </header>
      <main className="flex flex-col items-center px-4 py-8">
        <div className="flex w-full max-w-md flex-col items-stretch gap-10">
          <h1 className="text-center text-xl font-semibold text-neutral-950">
            Учебный план: {syllabus?.subject}{' '}
          </h1>
          {syllabus?.months.map((m, i) => (
            <div key={`m-${m.id}`} className="flex flex-col gap-6">
              <div className="text-center text-xl font-semibold text-neutral-950">
                {i + 1} месяц
              </div>
              <ul className="list-none space-y-4">
                {m.weeks.map((w, i) => (
                  <li key={`w-${w.id}`} className="space-y-2">
                    <span className="text-lg font-semibold">
                      {i + 1} Неделя
                    </span>
                    <ul className="list-inside list-disc">
                      {w.contents.map((c) => (
                        <li key={`c-${c.id}`}>
                          <Link
                            href={`/contents/${c.id}`}
                            className="tracking-wide hover:underline"
                          >
                            {c.text} <sup>↗</sup>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
