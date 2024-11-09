import { useEffect, useRef, useState } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import { Node } from "@/types/core";
import data from "@/data.json";
import { useThemeContext } from "@/context/ThemeContext";
import { Info } from "lucide-react";
import { DetailCard } from "@/components/ui/DetailCard";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useBreakpoint from "use-breakpoint";
import forceAtlas2 from "graphology-layout-forceatlas2"
import EdgeCurveProgram from "@sigma/edge-curve";

export default function GraphView() {
  const { theme } = useThemeContext();
  const graphRef = useRef<HTMLDivElement | null>(null);
  const { breakpoint } = useBreakpoint({
    default: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  });

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isNodeDetailsSheetOpen, setIsNodeDetailsSheetOpen] = useState(false);

  const graphConfig = {
    node: {
      label: {
        color: theme === "light" ? "black" : "white",
        size: 18,
      },
    },
  };

  const customConfig = {
    color: {
      a: "#FF1744",
      b: "#FF6D00",
      c: "#8c6238",
      baseNode: "gray",
    },
    nodeSize: {
      a: 45,
      b: 30,
      c: 20,
    },
    edgeSize: {
      a: 5,
      b: 3,
      c: 2,
    },
  };

  useEffect(() => {
    if (!graphRef.current || !data) return;

    const graph = new Graph();

    data.nodes.forEach((node) => {
      graph.addNode(node.key, {
        category: node.category,
        label: node.label,
        x: node.x,
        y: node.y,
        size: customConfig.nodeSize[
          node.category as keyof typeof customConfig.nodeSize
        ],
        color:
          customConfig.color[node.category as keyof typeof customConfig.color],
        details: node.details,
      });
    });

    data.edges.forEach((edge) => {
      graph.addEdge(edge.source, edge.target, {
        category: edge.category,
        size: customConfig.edgeSize[
          edge.category as keyof typeof customConfig.edgeSize
        ],
        color:
          customConfig.color[edge.category as keyof typeof customConfig.color],
      });
    });

    forceAtlas2.assign(graph, 20)

    const sigmaInstance = new Sigma(graph, graphRef.current, {
      allowInvalidContainer: true,
      defaultEdgeType: "curve",
      edgeProgramClasses: {
        curve: EdgeCurveProgram,
      },
      labelColor: {
        color: graphConfig.node.label.color,
      },
      // labelSize: graphConfig.node.label.size,
      // labelWeight: "bold",  
    });

    sigmaInstance.on("clickNode", (event) => {
      const nodeId = event.node;
      const nodeData = graph.getNodeAttributes(nodeId);
      setSelectedNode(nodeData as Node);
      setIsNodeDetailsSheetOpen(true);
    });

    sigmaInstance.on("enterNode", (event) => {
      const nodeId = event.node;
      const connectedNodes = graph.neighbors(nodeId)
      const connectedEdges = graph.edges(nodeId)

      const color = theme === 'light' ? 'black' : 'white'

      graph.setNodeAttribute(nodeId, "color", color)

      connectedNodes.forEach((node) => {
        graph.setNodeAttribute(node, "color", color)
      })

      connectedEdges.forEach((edge) => {
        graph.setEdgeAttribute(edge, "color", color)
      })
    });

    sigmaInstance.on("leaveNode", (event) => {
      const nodeId = event.node;
      const connectedNodes = graph.neighbors(nodeId)
      const connectedEdges = graph.edges(nodeId)

      const nodeAttributes = graph.getNodeAttributes(nodeId)
      graph.setNodeAttribute(nodeId, "color", customConfig.color[nodeAttributes['category'] as keyof typeof customConfig.color])

      connectedNodes.forEach((node) => {
        const connectedNodeAttributes = graph.getNodeAttributes(node)
        graph.setNodeAttribute(node, "color", customConfig.color[connectedNodeAttributes['category'] as keyof typeof customConfig.color])
      })

      connectedEdges.forEach((edge) => {
        const connectedEdgeAttributes = graph.getEdgeAttributes(edge)
        graph.setEdgeAttribute(edge, "color", customConfig.color[connectedEdgeAttributes['category'] as keyof typeof customConfig.color])
      })
    });

    sigmaInstance.on("clickStage", () => {
      setSelectedNode(null);
    });

    return () => {
      sigmaInstance.kill();
    };
  }, [data, theme]);

  return (
    <>
      <div className="relative w-full bg-grid border rounded-xl overflow-hidden">
        <div className="absolute left-0 p-4 top-0 z-[5]" tabIndex={-1}>
          <div className="bg-background rounded-lg p-3 border border-main-accent shadow flex items-center gap-4 text-main-accent">
            <Info className="" size={18} />
            <p className="bg-background text-xs ">
              {"Click on a node to see details"}
            </p>
          </div>
        </div>
        {selectedNode && (
          <>
            <div
              className="absolute right-6 z-[5] w-3/12 bottom-6 hidden lg:block"
              tabIndex={-1}
            >
              <DetailCard className="max-h-[600px]">
                <DetailCard.Body>
                  <DetailCard.Title>
                    {selectedNode?.details?.title}
                  </DetailCard.Title>
                  <DetailCard.Content>
                    {selectedNode?.details?.content}
                  </DetailCard.Content>
                </DetailCard.Body>
                <DetailCard.Image
                  src={selectedNode?.details?.supporting_image_url}
                />
              </DetailCard>
              <div className="absolute w-full bottom-0 bg-gradient-to-t from-black/50 dark:from-main-accent/50 to-transparent h-1/3 rounded-xl pointer-events-none" />
            </div>
          </>
        )}

        <div ref={graphRef} className="w-full h-full" />
      </div>
      {["default", "sm", 'md'].includes(breakpoint ?? "-") && (
        <Sheet
          open={isNodeDetailsSheetOpen}
          onOpenChange={setIsNodeDetailsSheetOpen}
        >
          <SheetContent className="w-full text-start" side={"bottom"}>
            <div className="relative">
              <DetailCard className="max-h-[600px] mt-8">
                <DetailCard.Body>
                  <DetailCard.Title>
                    {selectedNode?.details?.title}
                  </DetailCard.Title>
                  <DetailCard.Content>
                    {selectedNode?.details?.content}
                  </DetailCard.Content>
                </DetailCard.Body>
                <DetailCard.Image
                  src={selectedNode?.details?.supporting_image_url}
                />
              </DetailCard>
              <div className="absolute w-full bottom-0 bg-gradient-to-t from-black/50 dark:from-main-accent/50 to-transparent h-1/3 rounded-xl pointer-events-none" />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
