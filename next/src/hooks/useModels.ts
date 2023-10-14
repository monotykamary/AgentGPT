import { z } from "zod";

import { CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, GPT_4_32K, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B, LLAMA2_7B_AS, LLAMA2_13B_AS, LLAMA2_70B_AS, CODE_LLAMA2_34B_AS, MISTRAL_7B, SYNTHIA_70B } from "../utils/constants";
import { MAX_TOKENS } from "../types";

const Model = z.object({
  name: z.string(),
  max_tokens: z.number(),
  has_access: z.boolean(),
});

export type LLMModel = z.infer<typeof Model>;
export type LLMHost = { url: string, models: LLMModel[] }

const mapModels = (...names: string[]): LLMModel[] => names.map((name) => ({
  name,
  max_tokens: MAX_TOKENS[name],
  has_access: true
}));


export const llmHosts: LLMHost[] = [
  {
    url: "https://openrouter.ai/api/v1",
    models: mapModels(
      CLAUDE2,
      CODE_LLAMA2_34B,
      LLAMA2_13B,
      LLAMA2_70B,
      GPT_35_TURBO,
      GPT_35_TURBO_16K,
      GPT_4,
      GPT_4_32K,
      PALM2,
      PALM2_CODE,
      HERMES_LLAMA2_13B,
      AIROBOROS_70B,
      MISTRAL_7B,
      SYNTHIA_70B,
    )
  },
  {
    url: "https://api.endpoints.anyscale.com/v1",
    models: mapModels(
      LLAMA2_7B_AS,
      LLAMA2_13B_AS,
      LLAMA2_70B_AS,
      CODE_LLAMA2_34B_AS
    )
  },
]

export function useModels() {
  return {
    hosts: llmHosts,
    getModel: (base: LLMHost, name: string) => base.models.find((m) => m.name === name),
    getHost: (url: string) => llmHosts?.find((u) => u.url === url)
  };
}
