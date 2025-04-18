
import { ThemePicker } from "../theme/ThemePicker";

export function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-8 border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur z-10">
      <h1 className="text-2xl font-bold tracking-tight select-none font-serif">
        Online Resume Builder
      </h1>
      <ThemePicker />
    </header>
  );
}