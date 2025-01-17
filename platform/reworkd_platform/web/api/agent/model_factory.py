from typing import Any, Dict, Tuple, Optional, Union, Type

from langchain.chat_models import ChatOpenAI, AzureChatOpenAI
from pydantic import Field

from reworkd_platform.schemas.agent import LLM_Model, ModelSettings
from reworkd_platform.schemas.user import UserBase
from reworkd_platform.settings import Settings


class WrappedChatOpenAI(ChatOpenAI):
    client: Any = Field(
        default=None,
        description="Meta private value but mypy will complain its missing",
    )
    max_tokens: int
    model_name: LLM_Model = Field(alias="model")


class WrappedAzureChatOpenAI(AzureChatOpenAI, WrappedChatOpenAI):
    openai_api_base: str
    openai_api_version: str
    deployment_name: str


WrappedChat = Union[WrappedAzureChatOpenAI, WrappedChatOpenAI]


def create_model(
    settings: Settings,
    model_settings: ModelSettings,
    user: UserBase,
    streaming: bool = False,
    azure: bool = False,
    force_model: Optional[LLM_Model] = None,
) -> WrappedChatOpenAI:
    if (
        not model_settings.custom_api_key
        and model_settings.model == "openai/gpt-3.5-turbo"
        and azure
        and settings.azure_openai_enabled
    ):
        return _create_azure_model(model_settings, user, streaming)

    api_key = model_settings.custom_api_key or rotate_keys(
        gpt_3_key=settings.openai_api_key,
        gpt_4_key=settings.secondary_openai_api_key,
        model=model_settings.model,
    )

    llm_model = force_model or model_settings.model
    model: Type[WrappedChat] = WrappedChatOpenAI
    base, headers, use_helicone = get_base_and_headers(settings, model_settings, user)
    kwargs = {
        "openai_api_base": base,
        "openai_api_key": model_settings.custom_api_key or settings.openai_api_key,
        "temperature": model_settings.temperature,
        "model": llm_model,
        "max_tokens": model_settings.max_tokens,
        "streaming": streaming,
        "max_retries": 5,
        "model_kwargs": {"user": user.email, "headers": headers},
    }

    if azure:
        model = WrappedAzureChatOpenAI
        deployment_name = llm_model.replace(".", "")
        kwargs.update(
            {
                "openai_api_version": settings.openai_api_version,
                "deployment_name": deployment_name,
                "openai_api_type": "azure",
                "openai_api_base": base.rstrip("v1"),
            }
        )

        if use_helicone:
            kwargs["model"] = deployment_name

    return model(**kwargs)  # type: ignore


def get_base_and_headers(
    settings_: Settings, model_settings: ModelSettings, user: UserBase
) -> Tuple[str, Optional[Dict[str, str]], bool]:
    use_helicone = settings_.helicone_enabled and not model_settings.custom_api_key
    use_env_base = settings_.openai_api_base and not model_settings.custom_api_base
    base = settings_.helicone_api_base if use_helicone else settings_.openai_api_base if use_env_base else model_settings.custom_api_base
    headers = (
        {
            "Helicone-Auth": f"Bearer {settings_.helicone_api_key}",
            "Helicone-Cache-Enabled": "true",
            "Helicone-User-Id": user.id,
            "Helicone-OpenAI-Api-Base": settings_.openai_api_base,
        }
        if use_helicone
        else {
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "AgentGPT",
        }
    )

    return base, headers, use_helicone
