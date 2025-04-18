
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";

const themes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "Mono", value: "mono", icon: Palette },
] as const;

export function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center">
      {themes.map(({ name, value, icon: Icon }) => (
        <button
          key={value}
          aria-label={name}
          className={`p-2 rounded transition-colors duration-200 border border-transparent hover:border-neutral-400
            ${theme === value ? "bg-neutral-200 dark:bg-neutral-700 border-neutral-500" : "bg-transparent"}
          `}
          onClick={() => setTheme(value as any)}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}