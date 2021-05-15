import { ARQ } from "arq-js";

const arq = new ARQ(process.env.API_URL || "", process.env.API_KEY || "");

export const respond = async (query: string): Promise<string> => {
  return await arq.luna(query);
};
