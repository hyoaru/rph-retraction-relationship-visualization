import BaseContainer from "@/components/partial/BaseContainer";
import Footer from "@/components/partial/Footer";
import Header from "@/components/partial/Header";
import { Toaster } from "@/components/ui/sonner";
import { useThemeContext } from "@/context/ThemeContext";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { theme } = useThemeContext();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <BaseContainer className="my-4 grid w-full grow">
            <main className="grid grow">
              <Outlet />
            </main>
        </BaseContainer>
        <div className="h-[20px]"></div>
        <Footer />
      </div>
      <Toaster richColors theme={theme} toastOptions={{}} />
      <TanStackRouterDevtools />
    </>
  );
}
