import BaseContainer from "./BaseContainer";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="pb-6 backdrop-blur-sm">
      <BaseContainer className="flex flex-col items-center text-sm md:flex-row">
        <div className="flex items-center gap-2 font-custom font-medium uppercase">
          <p className="">
            <span className="font-sans font-bold">©</span>
            <span className="">{" 2024 "}</span>
            <Button
              variant={"link"}
              asChild
              className="p-0 font-medium text-sm"
            >
              <a href="https://github.com/hyoaru">
                <span>hyoaru</span>
              </a>
            </Button>
          </p>
          <hr className="w-8 border-foreground/20" />
          <span className="">made with tears</span>
        </div>
        <div className="flex items-center gap-2 font-custom font-medium uppercase md:ms-auto">
          <Button variant={"link"} asChild className="px-0 font-medium text-sm">
            <a href="https://github.com/hyoaru/rph-retraction-relationship-visualization">
              <p>github</p>
            </a>
          </Button>
        </div>
      </BaseContainer>
    </footer>
  );
}
