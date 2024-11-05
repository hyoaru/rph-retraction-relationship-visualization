export type Data = {
  nodes: Node[];
  edges: Edge[];
};

export type Node = {
  key: string;
  label: string;
  x: number;
  y: number;
  details?: {
    title: string;
    content: string;
    supporting_image_url: string;
  };
  category: string;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  category: string;
};
