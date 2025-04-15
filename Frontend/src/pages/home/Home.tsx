
const Home = () => {
  return (
    <main className="w-full min-h-[calc(100vh-60px)] px-4 md:px-8 py-6 bg-gray-50 dark:bg-gray-900">
      <section className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] md:text-[32px] font-extrabold leading-tight text-gray-900 dark:text-white">
            Setup security and sessions
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Follow the steps to activate using the <span className="text-purple-500 dark:text-purple-400 font-medium">Squeezy</span>.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home