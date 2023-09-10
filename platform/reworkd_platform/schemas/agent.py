from datetime import datetime
from typing import Literal, Dict, Optional, Any, List

from pydantic import BaseModel, Field, validator

from reworkd_platform.web.api.agent.analysis import Analysis

LLM_Model = Literal[
    "anthropic/claude-2",
    "meta-llama/codellama-34b-instruct",
    "meta-llama/llama-2-13b-chat",
    "meta-llama/llama-2-70b-chat",
    "openai/gpt-3.5-turbo",
    "openai/gpt-3.5-turbo-16k",
    "openai/gpt-4",
    "google/palm-2-chat-bison",
    "google/palm-2-codechat-bison",
    "nousresearch/nous-hermes-llama2-13b",
    "jondurbin/airoboros-l2-70b-2.1",
]
Loop_Step = Literal[
    "start",
    "analyze",
    "execute",
    "create",
    "summarize",
    "chat",
]
LLM_MODEL_MAX_TOKENS: Dict[LLM_Model, int] = {
    "anthropic/claude-2": 100_000,
    "meta-llama/codellama-34b-instruct": 4000,
    "meta-llama/llama-2-13b-chat": 4000,
    "meta-llama/llama-2-70b-chat": 4000,
    "openai/gpt-3.5-turbo": 4000,
    "openai/gpt-3.5-turbo-16k": 16000,
    "openai/gpt-4": 8000,
    "google/palm-2-chat-bison": 8000,
    "google/palm-2-codechat-bison": 8000,
    "nousresearch/nous-hermes-llama2-13b": 4000,
    "jondurbin/airoboros-l2-70b-2.1": 4000,
}


class ModelSettings(BaseModel):
    model: LLM_Model = Field(default="openai/gpt-3.5-turbo")
    custom_api_key: Optional[str] = Field(default=None)
    temperature: float = Field(default=0.9, ge=0.0, le=1.0)
    max_tokens: int = Field(default=4000, ge=0)
    language: str = Field(default="English")

    @validator("max_tokens")
    def validate_max_tokens(cls, v: float, values: Dict[str, Any]) -> float:
        model = values["model"]
        if v > (max_tokens := LLM_MODEL_MAX_TOKENS[model]):
            raise ValueError(f"Model {model} only supports {max_tokens} tokens")
        return v


class AgentRunCreate(BaseModel):
    goal: str
    model_settings: ModelSettings = Field(default=ModelSettings())


class AgentRun(AgentRunCreate):
    run_id: str


class AgentTaskAnalyze(AgentRun):
    task: str
    tool_names: List[str] = Field(default=[])
    model_settings: ModelSettings = Field(default=ModelSettings())


class AgentTaskExecute(AgentRun):
    task: str
    analysis: Analysis


class AgentTaskCreate(AgentRun):
    tasks: List[str] = Field(default=[])
    last_task: Optional[str] = Field(default=None)
    result: Optional[str] = Field(default=None)
    completed_tasks: List[str] = Field(default=[])


class AgentSummarize(AgentRun):
    results: List[str] = Field(default=[])


class AgentChat(AgentRun):
    message: str
    results: List[str] = Field(default=[])


class NewTasksResponse(BaseModel):
    run_id: str
    new_tasks: List[str] = Field(alias="newTasks")


class RunCount(BaseModel):
    count: int
    first_run: Optional[datetime]
    last_run: Optional[datetime]
