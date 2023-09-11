import React from "react";

import type { GPTModelNames } from "../../types";

export const ChatWindowTitle = ({ model }: { model: GPTModelNames }) => {
  return (
    <>
      Agent_<span className="text-amber-500">{model}</span>
    </>
  );
};
