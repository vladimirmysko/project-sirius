import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-stretch bg-white">
      <header className="flex h-16 flex-row items-center justify-center">
        <span className="text-lg font-semibold text-neutral-950">
          Project Sirius
        </span>
      </header>
      <main className="flex flex-1 flex-col">
        <div className="m-auto flex w-full max-w-md flex-col items-stretch gap-10">
          <h1 className="text-center text-3xl font-semibold text-neutral-950">
            С нами Ваше будущее в фокусе. Планируйте, учите и растите с нашей
            помощью.
          </h1>
          <p className="text-center text-3xl font-semibold text-neutral-950">
            Вы готовы?
          </p>
          <Link
            href="/syllabus/create"
            className="flex flex-row items-baseline gap-2 self-center rounded-full bg-neutral-950 px-4 py-2 text-base font-medium text-white hover:bg-neutral-800"
          >
            <span>Начать</span>
            <span>›</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
