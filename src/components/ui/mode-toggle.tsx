import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/context/theme-provider"

export function ModeToggle() {
  
    const { setTheme } = useTheme()
const theme =localStorage.getItem("vite-ui-theme")

  return (
   <Switch defaultChecked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
  )
}