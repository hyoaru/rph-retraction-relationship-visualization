import { Moon, Sun } from "lucide-react";

// App imports
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import BaseContainer from "./BaseContainer";
import { useThemeContext } from "@/context/ThemeContext";

import { toast } from "sonner";

export default function Header() {
  const { toggleTheme, theme } = useThemeContext();

  function onThemeToggle() {
    toggleTheme();
    toast.success(`Theme changed to ${theme === "light" ? "dark" : "light"}`);
  }

  return (
    <header className="sticky top-0 z-40 bg-transparent pb-2 pt-6 ">
      <BaseContainer className="flex items-center">
        <Link to="/">
          <div id="header-start" className="flex items-center gap-4">
            {/* <Ratio size={34} /> */}
            <p className="font-custom text-xl font-bold  ">
              {/* Readings in Philippine History G3 */}
            </p>
          </div>
        </Link>
        <div id="header-en" className="ms-auto flex items-center gap-2">
          <Button
            variant={"secondary-main-accent"}
            className="flex"
            size={"icon"}
            onClick={onThemeToggle}
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </BaseContainer>
    </header>
  );
}
