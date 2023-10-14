import { ENGLISH } from "./languages";
import type { ModelSettings } from "../types";

export const [CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, GPT_4_32K, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B, LLAMA2_7B_AS, LLAMA2_13B_AS, LLAMA2_70B_AS, CODE_LLAMA2_34B_AS] = [
  "anthropic/claude-2" as const,
  "meta-llama/codellama-34b-instruct" as const,
  "meta-llama/llama-2-13b-chat" as const,
  "meta-llama/llama-2-70b-chat" as const,
  "openai/gpt-3.5-turbo" as const,
  "openai/gpt-3.5-turbo-16k" as const,
  "openai/gpt-4" as const,
  "openai/gpt-4-32k" as const,
  "google/palm-2-chat-bison" as const,
  "google/palm-2-codechat-bison" as const,
  "nousresearch/nous-hermes-llama2-13b" as const,
  "jondurbin/airoboros-l2-70b-2.1" as const,
  "meta-llama/Llama-2-7b-chat-hf" as const,
  "meta-llama/Llama-2-13b-chat-hf" as const,
  "meta-llama/Llama-2-70b-chat-hf" as const,
  "codellama/CodeLlama-34b-Instruct-hf" as const,
];
export const GPT_MODEL_NAMES = [GPT_35_TURBO, GPT_4];

export const DEFAULT_MAX_LOOPS_FREE = 3 as const;
export const DEFAULT_MAX_LOOPS_CUSTOM_API_KEY = 10 as const;

export const getDefaultModelSettings = (): ModelSettings => {
  return {
    customApiKey: "",
    customApiBase: "",
    language: ENGLISH,
    customModelName: HERMES_LLAMA2_13B,
    customTemperature: 0.7,
    customMaxLoops: DEFAULT_MAX_LOOPS_FREE,
    maxTokens: 4000,
  };
};
