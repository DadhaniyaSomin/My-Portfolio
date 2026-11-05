"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle light and dark mode"
            title="Toggle light and dark mode"
            className="border border-black bg-white text-foreground hover:bg-cyan-50 dark:border-border dark:bg-card dark:hover:bg-muted"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
