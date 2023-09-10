import type {GetStaticProps} from "next";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useMemo} from "react";
import {
  FaCoins,
  FaGlobe,
  FaKey,
  FaRobot,
  FaSyncAlt,
  FaThermometerFull,
} from "react-icons/fa";

import nextI18NextConfig from "../../next-i18next.config.js";
import {useAuth} from "../hooks/useAuth";
import type {LLMHost, LLMModel} from "../hooks/useModels";
import {llmHosts, useModels} from "../hooks/useModels";
import {useSettings} from "../hooks/useSettings";
import DashboardLayout from "../layout/dashboard";
import type {GPTModelNames} from "../types";
import Button from "../ui/button";
import Combo from "../ui/combox";
import Input from "../ui/input";
import type {Language} from "../utils/languages";
import {languages} from "../utils/languages";

const SettingsPage = () => {
  const [t] = useTranslation("settings");
  const {settings, updateSettings, updateLangauge} = useSettings();
  const {session} = useAuth({protectedRoute: true});
  const {hosts, getModel, getHost} = useModels();

  const disableAdvancedSettings = !session?.user;
  const host = getHost(settings.customApiBase) ?? llmHosts[0]!;
  const model = useMemo(() => getModel(host, settings.customModelName) ?? host.models[0]!, [host, settings]) ;

  const updateModel = (model: LLMModel) => {
    if (settings.maxTokens > model.max_tokens) {
      updateSettings("maxTokens", model.max_tokens);
    }
    updateSettings("customModelName", model.name as GPTModelNames);
  };

  return (
    <DashboardLayout>
      <div className="grid min-h-screen flex-grow place-items-center p-2 sm:p-10 lg:p-16">
        <div className="background-color-1 border-color-1 m-2 rounded-xl border">
          <div className="border-color-1 align flex justify-between border-b-2 p-3 sm:p-5">
            <h1 className="text-color-primary text-3xl font-bold md:text-4xl">⚙ Settings</h1>
          </div>
          <div className="p-3 sm:p-5">
            <div className="flex flex-col gap-3">
              <Combo<Language>
                label="Language"
                value={settings.language}
                valueMapper={(e) => e.name}
                onChange={(e) => {
                  updateLangauge(e).catch(console.error);
                }}
                items={languages}
                icon={<FaGlobe/>}
              />

              <Combo<LLMHost>
                label="API Host"
                value={host}
                valueMapper={(e) => e.url}
                onChange={(e) => {
                  updateSettings("customApiBase", e.url);
                  updateModel(model);
                }}
                items={hosts}
                icon={<FaKey/>}
              />

              <Input
                label="API Key"
                name="api-key"
                placeholder="sk..."
                helpText={
                  <span>
                    You can optionally use your own API key here. You can find your API key in your{" "}
                    <a className="link" href="https://platform.openai.com/account/api-keys">
                      OpenAI dashboard.
                    </a>
                  </span>
                }
                type="password"
                value={settings.customApiKey}
                onChange={(e) => {
                  updateSettings("customApiKey", e.target.value);
                }}
                icon={<FaKey/>}
                className="flex-grow-1 mr-2"
              />
            </div>

            {!disableAdvancedSettings && (
              <div className="mt-4 flex flex-col ">
                <h1 className="text-color-primary pb-4 text-xl font-bold">Advanced Settings</h1>
                <div className="flex flex-col gap-4">
                  <Combo<LLMModel>
                    label="Model"
                    value={model}
                    valueMapper={(e) => e.name}
                    onChange={updateModel}
                    items={host.models}
                    icon={<FaRobot/>}
                  />
                  <Input
                    label={`${t("TEMPERATURE")}`}
                    value={settings.customTemperature}
                    name="temperature"
                    type="range"
                    onChange={(e) =>
                      updateSettings("customTemperature", parseFloat(e.target.value))
                    }
                    attributes={{
                      min: 0,
                      max: 1,
                      step: 0.01,
                    }}
                    helpText={t("HIGHER_VALUES_MAKE_OUTPUT_MORE_RANDOM")}
                    icon={<FaThermometerFull/>}
                    disabled={disableAdvancedSettings}
                  />
                  <Input
                    label={`${t("LOOP")}`}
                    value={settings.customMaxLoops}
                    name="loop"
                    type="range"
                    onChange={(e) => updateSettings("customMaxLoops", parseFloat(e.target.value))}
                    attributes={{
                      min: 1,
                      max: 25,
                      step: 1,
                    }}
                    helpText={t("CONTROL_THE_MAXIMUM_NUM_OF_LOOPS")}
                    icon={<FaSyncAlt/>}
                    disabled={disableAdvancedSettings}
                  />
                  <Input
                    label={`${t("TOKENS")}`}
                    value={settings.maxTokens}
                    name="tokens"
                    type="range"
                    onChange={(e) => updateSettings("maxTokens", parseFloat(e.target.value))}
                    attributes={{
                      min: 200,
                      max: model!.max_tokens,
                      step: 100,
                    }}
                    helpText={t("CONTROL_MAXIMUM_OF_TOKENS_DESCRIPTION")}
                    icon={<FaCoins/>}
                    disabled={disableAdvancedSettings}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;

export const getStaticProps: GetStaticProps = async ({locale = "en"}) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};
