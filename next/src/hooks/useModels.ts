import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { z } from "zod";

import { get } from "../services/fetch-utils";
import { CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, GPT_4_32K, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B, LLAMA2_7B_AS, LLAMA2_13B_AS, LLAMA2_70B_AS, CODE_LLAMA2_34B_AS } from "../utils/constants";

const Model = z.object({
  name: z.string(),
  max_tokens: z.number(),
  has_access: z.boolean(),
});

export type LLMModel = z.infer<typeof Model>;
export type LLMHost = { url: string, models: LLMModel[] }

export const llmHosts: LLMHost[] = [
  {
    url: "https://openrouter.ai/api/v1", models: [
      { name: CLAUDE2, max_tokens: 100_000, has_access: true },
      { name: CODE_LLAMA2_34B, max_tokens: 4000, has_access: true },
      { name: LLAMA2_13B, max_tokens: 4000, has_access: true },
      { name: LLAMA2_70B, max_tokens: 4000, has_access: true },
      { name: GPT_35_TURBO, max_tokens: 4000, has_access: true },
      { name: GPT_35_TURBO_16K, max_tokens: 16_000, has_access: true },
      { name: GPT_4, max_tokens: 8000, has_access: true },
      { name: GPT_4_32K, max_tokens: 32_000, has_access: true },
      { name: PALM2, max_tokens: 8000, has_access: true },
      { name: PALM2_CODE, max_tokens: 8000, has_access: true },
      { name: HERMES_LLAMA2_13B, max_tokens: 4000, has_access: true },
      { name: AIROBOROS_70B, max_tokens: 4000, has_access: true },
    ]
  },
  {
    url: "https://api.endpoints.anyscale.com/v1", models: [
      { name: LLAMA2_7B_AS, max_tokens: 4000, has_access: true },
      { name: LLAMA2_13B_AS, max_tokens: 4000, has_access: true },
      { name: LLAMA2_70B_AS, max_tokens: 4000, has_access: true },
      { name: CODE_LLAMA2_34B_AS, max_tokens: 4000, has_access: true },
    ]
  },
]

export function useModels() {
  return {
    hosts: llmHosts,
    getModel: (base: LLMHost, name: string) => base.models.find((m) => m.name === name),
    getHost: (url: string) => llmHosts?.find((u) => u.url === url)
  };
}
