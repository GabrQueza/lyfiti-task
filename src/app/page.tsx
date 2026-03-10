import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Lyfiti Task
        </h1>
        <p className="max-w-xl text-lg mt-4 text-center">
          Starting point for the Next.js application, ready for additional layout and components.
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/dashboard"
          >
            Go to Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
