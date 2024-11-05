import { useEffect, useRef, useState } from "react";
import Graph from "graphology";
import Sigma from "sigma";
import { Node } from "@/types/core";
import data from "@/data.json";
import { useThemeContext } from "@/context/ThemeContext";
import { Info } from "lucide-react";

export default function GraphView() {
  const { theme } = useThemeContext();
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

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
      c: "black",
      baseNode: "gray",
    },
    nodeSize: {
      a: 65,
      b: 45,
      c: 30,
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
        size: customConfig.edgeSize[
          edge.category as keyof typeof customConfig.edgeSize
        ],
        color:
          customConfig.color[edge.category as keyof typeof customConfig.color],
      });
    });

    const sigmaInstance = new Sigma(graph, graphRef.current, {
      allowInvalidContainer: true,
      labelColor: {
        color: graphConfig.node.label.color,
      },
      labelSize: graphConfig.node.label.size,
      labelWeight: "bold",
    });

    sigmaInstance.on("clickNode", (event) => {
      const nodeId = event.node;
      const nodeData = graph.getNodeAttributes(nodeId);
      setSelectedNode(nodeData as Node);
    });

    sigmaInstance.on("clickStage", () => {
      setSelectedNode(null);
    });

    return () => {
      sigmaInstance.kill();
    };
  }, [data, theme]);

  return (
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
        <div
          className="absolute right-0 z-[5] w-3/12 h-6/12 p-6 bottom-0"
          tabIndex={-1}
        >
          <div className="bg-background border h-full w-full rounded-xl p-6 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col gap-1" id="selected-node-header">
              <p className="text-base font-bold">
                {selectedNode?.details?.title}
              </p>
              <p className="text-sm">{selectedNode?.details?.content}</p>
            </div>
            <img
              src={selectedNode?.details?.supporting_image_url}
              className="w-full object-cover rounded-xl"
            />
          </div>
        </div>
      )}

      <div ref={graphRef} className="w-full h-full" />
    </div>
  );
}
