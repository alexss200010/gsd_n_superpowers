import type { Artifact } from "../types";

export const artifacts: Artifact[] = [
  {
    id: "design-spec",
    name: "Дизайн-спецификация прогресса Superpowers",
    type: "spec",
    stageId: "spec",
    status: "created",
    path: "docs/superpowers/specs/2026-05-06-superpowers-progress-design.md",
    description: "Согласованный продуктовый дизайн и объем для первой версии панели."
  },
  {
    id: "implementation-plan",
    name: "План реализации",
    type: "plan",
    stageId: "plan",
    status: "pending",
    path: "docs/superpowers/plans/2026-05-06-superpowers-progress.md",
    description: "Пошаговый план с тестами, путями файлов и коммитами."
  },
  {
    id: "build-output",
    name: "Производственная сборка",
    type: "verification",
    stageId: "verify",
    status: "pending",
    description: "Доказательства из npm run build."
  },
  {
    id: "visual-check",
    name: "Визуальная проверка в браузере",
    type: "verification",
    stageId: "verify",
    status: "pending",
    description: "Ручной осмотр раскладки на десктопе и мобильном экране."
  },
  {
    id: "finish-commit",
    name: "Финальный коммит реализации",
    type: "commit",
    stageId: "finish",
    status: "pending",
    description: "Чистое закоммиченное состояние после проверки."
  }
];
