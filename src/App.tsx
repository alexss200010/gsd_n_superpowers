import { lazy, Suspense, type MouseEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Sparkles, Terminal } from "lucide-react";
import {
  artifacts,
  gsdAdvancedCommands,
  gsdCommands,
  gsdPipelineExample,
  gsdPrinciples,
  productPipelineExample,
  skills,
  workflowStages
} from "./data";
import { ArtifactsList } from "./components/ArtifactsList";
import { DashboardHeader } from "./components/DashboardHeader";
import { GsdCheatSheet } from "./components/GsdCheatSheet";
import { NextActionPanel } from "./components/NextActionPanel";
import { ProductPipeline } from "./components/ProductPipeline";
import { SkillMap } from "./components/SkillMap";
import { WorkflowTimeline } from "./components/WorkflowTimeline";
import { getActiveStage, getPanelState } from "./lib/workflowSelectors";

type Route = "home" | "superpowers" | "gsd";

const SparklesCore = lazy(() =>
  import("./components/ui/sparkles").then((module) => ({ default: module.SparklesCore }))
);

function getRouteFromPath(pathname: string): Route {
  if (pathname === "/superpowers") {
    return "superpowers";
  }

  if (pathname === "/gsd") {
    return "gsd";
  }

  return "home";
}

export default function App() {
  const activeStage = getActiveStage(workflowStages);
  const [route, setRoute] = useState<Route>(() => getRouteFromPath(window.location.pathname));
  const [selectedSkillId, setSelectedSkillId] = useState<string | undefined>("writing-plans");
  const [selectedStageId, setSelectedStageId] = useState(activeStage.id);
  const [selectedGsdCommandId, setSelectedGsdCommandId] = useState(gsdCommands[0].id);

  const panelState = useMemo(
    () =>
      getPanelState({
        artifacts,
        skills,
        stages: workflowStages,
        selectedSkillId,
        selectedStageId
      }),
    [selectedSkillId, selectedStageId]
  );

  useEffect(() => {
    function handlePopState() {
      setRoute(getRouteFromPath(window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function handleRouteClick(event: MouseEvent<HTMLAnchorElement>, pathname: string) {
    event.preventDefault();

    if (window.location.pathname !== pathname) {
      window.history.pushState({}, "", pathname);
    }

    setRoute(getRouteFromPath(pathname));
  }

  function handleSelectSkill(skillId: string) {
    setSelectedSkillId(skillId);
  }

  function handleSelectStage(stageId: string) {
    setSelectedSkillId(undefined);
    setSelectedStageId(stageId);
  }

  return (
    <main className={`app-shell app-shell--${route}`}>
      {route === "home" ? (
        <section className="home-page" aria-labelledby="home-title">
          <div className="home-atmosphere" aria-hidden="true">
            <Suspense fallback={null}>
              <SparklesCore
                background="transparent"
                className="home-atmosphere__core"
                maxSize={1.8}
                minSize={0.45}
                particleColor="#9b4937"
                particleDensity={150}
                speed={1.1}
              />
            </Suspense>
          </div>
          <div className="home-page__intro">
            <span className="panel__eyebrow">Cheat sheets</span>
            <h1 id="home-title">Шпаргалка по двум методологиям разработки</h1>
            <p>
              Выбери методологию, чтобы открыть отдельную страницу с командами,
              workflow и практическими подсказками.
            </p>
          </div>
          <div className="methodology-grid">
            <a
              className="methodology-card methodology-card--superpowers"
              href="/superpowers"
              onClick={(event) => handleRouteClick(event, "/superpowers")}
            >
              <span className="methodology-card__icon">
                <Sparkles aria-hidden="true" size={26} />
              </span>
              <span className="methodology-card__body">
                <strong>Superpowers</strong>
                <span>Навыки, стадии, артефакты и следующий шаг в агентной разработке.</span>
              </span>
              <ArrowRight aria-hidden="true" className="methodology-card__arrow" size={22} />
            </a>
            <a
              className="methodology-card methodology-card--gsd"
              href="/gsd"
              onClick={(event) => handleRouteClick(event, "/gsd")}
            >
              <span className="methodology-card__icon">
                <Terminal aria-hidden="true" size={26} />
              </span>
              <span className="methodology-card__body">
                <strong>GSD</strong>
                <span>Командный цикл от обсуждения и фаз до проверки и ship.</span>
              </span>
              <ArrowRight aria-hidden="true" className="methodology-card__arrow" size={22} />
            </a>
          </div>
        </section>
      ) : (
        <nav className="view-switcher" aria-label="Разделы сайта">
          <a
            className="view-switcher__button"
            href="/"
            onClick={(event) => handleRouteClick(event, "/")}
          >
            <BookOpen aria-hidden="true" size={16} />
            Главная
          </a>
          <a
            aria-current={route === "superpowers" ? "page" : undefined}
            className={route === "superpowers" ? "view-switcher__button view-switcher__button--active" : "view-switcher__button"}
            href="/superpowers"
            onClick={(event) => handleRouteClick(event, "/superpowers")}
          >
            Superpowers
          </a>
          <a
            aria-current={route === "gsd" ? "page" : undefined}
            className={route === "gsd" ? "view-switcher__button view-switcher__button--active" : "view-switcher__button"}
            href="/gsd"
            onClick={(event) => handleRouteClick(event, "/gsd")}
          >
            GSD
          </a>
        </nav>
      )}

      {route === "superpowers" ? (
        <>
          <DashboardHeader activeStage={panelState.stage} />
          <div className="dashboard-grid">
            <SkillMap
              skills={skills}
              selectedSkillId={selectedSkillId}
              onSelectSkill={handleSelectSkill}
            />
            <WorkflowTimeline
              stages={workflowStages}
              selectedStageId={panelState.stage.id}
              onSelectStage={handleSelectStage}
            />
            <NextActionPanel skill={panelState.skill} stage={panelState.stage} />
          </div>
          <ArtifactsList artifacts={panelState.artifacts} stageLabel={panelState.stage.label} />
          <ProductPipeline
            productName={productPipelineExample.productName}
            premise={productPipelineExample.premise}
            steps={productPipelineExample.steps}
          />
        </>
      ) : null}

      {route === "gsd" ? (
        <GsdCheatSheet
          advancedCommands={gsdAdvancedCommands}
          commands={gsdCommands}
          pipelineExample={gsdPipelineExample}
          principles={gsdPrinciples}
          selectedCommandId={selectedGsdCommandId}
          onSelectCommand={setSelectedGsdCommandId}
        />
      ) : null}
    </main>
  );
}
