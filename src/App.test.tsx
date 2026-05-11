import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Superpowers Progress dashboard", () => {
  function renderAt(path: string = "/") {
    window.history.pushState({}, "", path);
    return render(<App />);
  }

  it("opens on a routing home page with two methodology cards", () => {
    renderAt();

    expect(screen.getByRole("heading", { name: "Шпаргалка по двум методологиям разработки" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /superpowers/i })).toHaveAttribute("href", "/superpowers");
    expect(screen.getByRole("link", { name: /^gsd/i })).toHaveAttribute("href", "/gsd");
    expect(screen.queryByRole("heading", { name: "Build faster" })).not.toBeInTheDocument();
  });

  it("navigates from the home card to the Superpowers page", async () => {
    const user = userEvent.setup();
    renderAt();

    await user.click(screen.getByRole("link", { name: /superpowers/i }));

    expect(window.location.pathname).toBe("/superpowers");
    expect(screen.getByRole("heading", { name: "Прогресс Superpowers" })).toBeInTheDocument();
  });

  it("navigates from the home card to the GSD page", async () => {
    const user = userEvent.setup();
    renderAt();

    await user.click(screen.getByRole("link", { name: /^gsd/i }));

    expect(window.location.pathname).toBe("/gsd");
    expect(screen.getByRole("heading", { name: "Get Shit Done" })).toBeInTheDocument();
  });

  it("opens as a working dashboard", () => {
    renderAt("/superpowers");

    expect(screen.getByRole("heading", { name: "Прогресс Superpowers" })).toBeInTheDocument();
    expect(screen.getByText("Карта навыков")).toBeInTheDocument();
    expect(screen.getByText("Этапы работы")).toBeInTheDocument();
    expect(screen.getByText("Следующее действие")).toBeInTheDocument();
    expect(screen.getByText("Артефакты")).toBeInTheDocument();
  });

  it("updates the next action panel when a skill is selected", async () => {
    const user = userEvent.setup();
    renderAt("/superpowers");

    await user.click(screen.getByRole("button", { name: /test-driven-development/i }));

    const nextAction = within(screen.getByRole("complementary", { name: "Следующее действие" }));
    expect(nextAction.getByText("Сборка")).toBeInTheDocument();
    expect(nextAction.getByText("Реализовать тонкими слоями")).toBeInTheDocument();
    expect(nextAction.getByText("Выполнить первую задачу реализации.")).toBeInTheDocument();
  });

  it("updates the next action panel when a workflow stage is selected", async () => {
    const user = userEvent.setup();
    renderAt("/superpowers");

    const workflow = within(screen.getByRole("region", { name: "Этапы работы" }));
    await user.click(workflow.getByRole("button", { name: /проверка/i }));

    const nextAction = within(screen.getByRole("complementary", { name: "Следующее действие" }));
    expect(nextAction.getByText("Проверка")).toBeInTheDocument();
    expect(nextAction.getByText("Доказать, что все работает")).toBeInTheDocument();
    expect(nextAction.getByText("Запустить npm-проверки и визуальный QA.")).toBeInTheDocument();
    expect(screen.getByText("Производственная сборка")).toBeInTheDocument();
  });

  it("shows a product creation pipeline example on the Superpowers page", () => {
    renderAt("/superpowers");

    expect(screen.getByRole("heading", { name: "Пример pipeline продукта" })).toBeInTheDocument();
    expect(screen.getByText("AI-ассистент для подготовки встреч")).toBeInTheDocument();
    expect(screen.getByText("Покажи, как пройти от идеи до ship без потери контекста.")).toBeInTheDocument();
    expect(screen.getByText("Скилл")).toBeInTheDocument();
    expect(screen.getByText("Что попросить")).toBeInTheDocument();
    expect(screen.getByText("Артефакт")).toBeInTheDocument();
    expect(screen.getByText("Проверь, что сборка, тесты и визуальный QA подтверждают готовность.")).toBeInTheDocument();
  });

  it("opens the Russian GSD cheat sheet and updates the selected command", async () => {
    const user = userEvent.setup();
    renderAt("/gsd");

    expect(screen.getByRole("heading", { name: "Get Shit Done" })).toBeInTheDocument();
    expect(screen.getByText("Шесть команд, чтобы держать контекст чистым и доводить фазы до ship.")).toBeInTheDocument();
    expect(screen.getAllByText("/gsd-new-project")).toHaveLength(3);
    expect(screen.getAllByText("/gsd-ship 1")).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: /\/gsd-execute-phase 1/i }));

    const detail = within(screen.getByRole("complementary", { name: "Выбранная команда GSD" }));
    expect(detail.getByRole("heading", { name: "Execute" })).toBeInTheDocument();
    expect(detail.getByText("Планы выполняются волнами, а каждая задача получает свежий контекст.")).toBeInTheDocument();
  });

  it("shows advanced GSD commands on the cheat sheet", async () => {
    renderAt("/gsd");

    expect(screen.getByRole("heading", { name: "Продвинутые команды" })).toBeInTheDocument();
    expect(screen.getByText("New Milestone")).toBeInTheDocument();
    expect(screen.getByText("/gsd-new-milestone")).toBeInTheDocument();
    expect(screen.getByText("SID / Spec Phase")).toBeInTheDocument();
    expect(screen.getByText("/gsd-spec-phase")).toBeInTheDocument();
    expect(screen.getByText("/gsd-spike")).toBeInTheDocument();
    expect(screen.getByText("/gsd-sketch")).toBeInTheDocument();
  });

  it("shows a GSD product pipeline example on the cheat sheet", async () => {
    renderAt("/gsd");

    expect(screen.getByRole("heading", { name: "Пример GSD pipeline" })).toBeInTheDocument();
    expect(screen.getByText("Клиентский портал для онбординга")).toBeInTheDocument();
    expect(screen.getByText("Как провести продукт через GSD-команды от первого контекста до PR.")).toBeInTheDocument();
    expect(screen.getByText("Команда")).toBeInTheDocument();
    expect(screen.getByText("Когда запускать")).toBeInTheDocument();
    expect(screen.getByText("Что появится")).toBeInTheDocument();
    expect(screen.getByText("Запусти /gsd-verify-work 1 и преврати найденные дефекты в fix-план.")).toBeInTheDocument();
  });
});
