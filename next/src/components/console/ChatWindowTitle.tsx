import React from "react";

import type { GPTModelNames } from "../../types";
import { CODE_LLAMA2_34B, LLAMA2_13B, LLAMA2_70B, GPT_35_TURBO_16K, GPT_4, CLAUDE2 } from "../../types";

export const ChatWindowTitle = ({ model }: { model: GPTModelNames }) => {
  return (
    <>
      Agent_<span className="text-amber-500">{model}</span>
    </>
  );
};
