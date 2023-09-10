import { CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, GPT_4_32K, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B, LLAMA2_7B_AS, LLAMA2_13B_AS, LLAMA2_70B_AS, CODE_LLAMA2_34B_AS } from "../utils/constants";
import { type Language } from "../utils/languages";

export const GPT_MODEL_NAMES = [CLAUDE2, CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4, GPT_4_32K, PALM2, PALM2_CODE, HERMES_LLAMA2_13B, AIROBOROS_70B, LLAMA2_7B_AS, LLAMA2_13B_AS, LLAMA2_70B_AS, CODE_LLAMA2_34B_AS];
export type GPTModelNames = typeof GPT_MODEL_NAMES[any];

export const MAX_TOKENS: Record<GPTModelNames, number> = {
  "anthropic/claude-2": 100_000,
  "meta-llama/codellama-34b-instruct": 4000,
  "meta-llama/llama-2-13b-chat": 4000,
  "meta-llama/llama-2-70b-chat": 4000,
  "openai/gpt-3.5-turbo": 4000,
  "openai/gpt-3.5-turbo-16k": 16_000,
  "openai/gpt-4": 8000,
  "openai/gpt-4-32k": 32_000,
  "google/palm-2-chat-bison": 8000,
  "google/palm-2-codechat-bison": 8000,
  "nousresearch/nous-hermes-llama2-13b": 4000,
  "jondurbin/airoboros-l2-70b-2.1": 4000,
  "meta-llama/Llama-2-7b-chat-hf": 4000,
  "meta-llama/Llama-2-13b-chat-hf": 4000,
  "meta-llama/Llama-2-70b-chat-hf": 4000,
  "codellama/CodeLlama-34b-Instruct-hf": 4000,
};

export interface ModelSettings {
  language: Language;
  customApiKey: string;
  customApiBase: string;
  customModelName: GPTModelNames;
  customTemperature: number;
  customMaxLoops: number;
  maxTokens: number;
}
