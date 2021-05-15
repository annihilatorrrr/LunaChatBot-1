import { ARQ } from "arq-js";

const arq = new ARQ(process.env.ARQ_API || "");

export const respond = async (query: string): Promise<string> => {
  return await arq.luna(query);
};
