import { ARQ } from "arq-js";

const arq = new ARQ(process.env.ARQ_API || "");

export const respond = async (query: string): Promise<string> => {
  const result = await arq.luna(query);

  try {
    return result.response;
  } catch (error) {
    return result;
  }
};
