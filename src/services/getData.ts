import { Data } from "@/types/core";
import axios from "axios";

export const getData = async (): Promise<Data> => {
  return await axios.get<Data>("/data.json").then((response) => response.data);
};
