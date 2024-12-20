import GraphView from "@/components/GraphView";
import { createFileRoute } from "@tanstack/react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const members = [
    { name: "Jen Jade Cabrera", programLevel: "BSCS 4" },
    { name: "Kyla Aliah Bagunu", programLevel: "BSCS 2" },
    { name: "Dana Gayeta", programLevel: "BSIT 1" },
    { name: "Edreeniah Mierre Dalisay", programLevel: "BSIT 1" },
    { name: "Escoltor Ann Xhanine", programLevel: "BSIT 1" },
    { name: "Lomotan Christopher Andre V", programLevel: "BSIT 1" },
    { name: "Blancaflor Fredrick", programLevel: "BSIT 1" },
    { name: "Rafael Miguel Catipon", programLevel: "BSIT 1" },
    { name: "Rosselon Miñas", programLevel: "BSIT 1" },
    { name: "Lucky Abanica", programLevel: "BSIT 1" },
    { name: "Joseph Janrene J. Magno", programLevel: "BSIT 1" },
    { name: "Gezric Flores", programLevel: "BSIT 1" },
  ];
  return (
    <>
      <div className="flex flex-col gap-8">
        <Alert className="border-main-accent bg-main-accent/5 lg:hidden">
          <div className="flex text-main-accent gap-4">
            <Info className="" size={30} />
            <div className="flex flex-col">
              <AlertTitle className="font-semibold text-sm">Best viewed on wider screens!</AlertTitle>
              <AlertDescription className="text-foreground text-xs">
                Please do have this viewed on a laptop or desktop instead
              </AlertDescription>
            </div>
          </div>
        </Alert>
        <div className="flex flex-col gap-1">
          <p className="text-sm">Readings in Philippine History</p>
          <p className="text-3xl font-bold">
            Jose Rizal's Retraction Relationship Visualization
          </p>
          <div className="mt-2">
            <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fhyoaru.github.io%2Frph-retraction-relationship-visualization%2F&label=VISITORS&labelColor=%23000000&countColor=%23eeeeee&style=flat-square&labelStyle=upper" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Assigned topic: Retraction Letter</p>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Task Background</p>
            <ul className="text-sm list-disc ms-4 md:ms-8">
              <li>
                Following your attendance at the sponsored activity, choose
                primary sources discussed during the event, such as articles,
                videos, or research papers, that represent different viewpoints
                on the topic.
              </li>
              <li>
                Create a captivating multimedia presentation—like a narrated
                PowerPoint, video, podcast, infographics, and the likes—that
                conveys your arguments in favor of or against the issue,
                grounding them in these primary sources.
              </li>
              <li>
                {" "}
                Share your presentation with peers for constructive feedback,
                engage in a classroom discussion to explore diverse
                perspectives, and reflect on how the peer feedback influenced
                your understanding of the topic and the strength of your
                arguments.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">Group 3 Members</p>
            <ul className="text-sm list-disc ms-4 md:ms-8">
              {members.map((member) => (
                <li key={`Member-${member.name}`}>
                  {member.name}, {member.programLevel}
                </li>
              ))}
            </ul>
          </div>
          <p className="font-semibold">
            Course Professor: Dr. John Cliford Alvero
          </p>
        </div>
        <div className="h-[800px]">
          <GraphView />
        </div>
      </div>
    </>
  );
}
