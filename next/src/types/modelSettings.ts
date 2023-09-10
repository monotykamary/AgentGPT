import { type Language } from "../utils/languages";

export const [CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B] = [
  "anthropic/claude-2" as const,
  "meta-llama/codellama-34b-instruct" as const,
  "meta-llama/llama-2-13b-chat" as const,
  "meta-llama/llama-2-70b-chat" as const,
  "openai/gpt-3.5-turbo" as const,
  "openai/gpt-3.5-turbo-16k" as const,
  "openai/gpt-4" as const,
  "google/palm-2-chat-bison" as const,
  "google/palm-2-codechat-bison" as const,
  "nousresearch/nous-hermes-llama2-13b" as const,
  "jondurbin/airoboros-l2-70b-2.1" as const,
];
export const GPT_MODEL_NAMES = [CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B];
export type GPTModelNames = "anthropic/claude-2" | "meta-llama/codellama-34b-instruct" | "meta-llama/llama-2-13b-chat" | "meta-llama/llama-2-70b-chat" | "openai/gpt-3.5-turbo" | "openai/gpt-3.5-turbo-16k" | "openai/gpt-4" |"google/palm-2-chat-bison" | "google/palm-2-codechat-bison" | "nousresearch/nous-hermes-llama2-13b" | "jondurbin/airoboros-l2-70b-2.1";

export const MAX_TOKENS: Record<GPTModelNames, number> = {
  "anthropic/claude-2": 100_000,
  "meta-llama/codellama-34b-instruct": 4000,
  "meta-llama/llama-2-13b-chat": 4000,
  "meta-llama/llama-2-70b-chat": 4000,
  "openai/gpt-3.5-turbo": 4000,
  "openai/gpt-3.5-turbo-16k": 16000,
  "openai/gpt-4": 4000,
  "google/palm-2-chat-bison": 8000,
  "google/palm-2-codechat-bison": 8000,
  "nousresearch/nous-hermes-llama2-13b": 4000,
  "jondurbin/airoboros-l2-70b-2.1": 4000,
};

export interface ModelSettings {
  language: Language;
  customApiKey: string;
  customModelName: GPTModelNames;
  customTemperature: number;
  customMaxLoops: number;
  maxTokens: number;
}
