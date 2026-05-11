import type { Skill } from "../types";

export const skills: Skill[] = [
  {
    id: "using-superpowers",
    name: "using-superpowers",
    purpose: "Проверяет, подходит ли какой-то навык, до начала действия.",
    trigger: "Старт работы или любая задача, где может пригодиться навык.",
    status: "complete",
    stageIds: ["idea", "brainstorm", "spec", "plan", "build", "verify", "finish"]
  },
  {
    id: "brainstorming",
    name: "brainstorming",
    purpose: "Превращает расплывчатую идею в согласованный дизайн.",
    trigger: "Творческая работа, новые функции или изменения поведения.",
    status: "complete",
    stageIds: ["brainstorm", "spec"]
  },
  {
    id: "writing-plans",
    name: "writing-plans",
    purpose: "Превращает согласованную спецификацию в исполнимые задачи.",
    trigger: "Спецификация или требования уже есть, а код еще не начат.",
    status: "active",
    stageIds: ["plan"]
  },
  {
    id: "test-driven-development",
    name: "test-driven-development",
    purpose: "Удерживает реализацию в ритме падающих тестов и маленьких проходов.",
    trigger: "Начинается реализация функции или исправления.",
    status: "next",
    stageIds: ["build"]
  },
  {
    id: "verification-before-completion",
    name: "verification-before-completion",
    purpose: "Требует доказательств перед заявлением, что работа готова.",
    trigger: "Перед словами о готовности, исправлении или пройденных проверках.",
    status: "pending",
    stageIds: ["verify"]
  },
  {
    id: "finishing-a-development-branch",
    name: "finishing-a-development-branch",
    purpose: "Выбирает аккуратный способ передачи после проверенной реализации.",
    trigger: "Реализация готова, проверки проходят.",
    status: "pending",
    stageIds: ["finish"]
  }
];
