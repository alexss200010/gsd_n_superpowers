import type { GsdAdvancedCommand, GsdCommand, GsdPipelineStep, GsdPrinciple } from "../types";

export const gsdCommands: GsdCommand[] = [
  {
    id: "initialize",
    label: "Initialize",
    command: "/gsd-new-project",
    purpose: "Собирает вопросы, исследование, требования и roadmap перед сборкой.",
    when: "Новый проект или крупный кусок работы еще не разложен.",
    output: "Проектный контекст, требования и первые фазы работы.",
    guardrail: "Не начинай кодить, пока не понятно, что именно считается результатом."
  },
  {
    id: "discuss",
    label: "Discuss",
    command: "/gsd-discuss-phase 1",
    purpose: "Вытаскивает серые зоны фазы: layout, API, ошибки, структуры данных.",
    when: "Roadmap есть, но фаза пока описана одной строкой.",
    output: "Решения, которые потом питают исследование и план.",
    guardrail: "Не отдавай агенту туман. Он заполнит пробелы, но не обязательно твоими решениями."
  },
  {
    id: "plan",
    label: "Plan",
    command: "/gsd-plan-phase 1",
    purpose: "Делает исследование, план и проверку плана в одном цикле.",
    when: "Фаза обсуждена, нужно превратить ее в маленькие исполнимые задачи.",
    output: "Планы, которые достаточно малы для свежего контекста.",
    guardrail: "Большой план режь на куски. Если задачу нельзя проверить отдельно, она слишком жирная."
  },
  {
    id: "execute",
    label: "Execute",
    command: "/gsd-execute-phase 1",
    purpose: "Планы выполняются волнами, а каждая задача получает свежий контекст.",
    when: "План прошел проверку, можно запускать реализацию.",
    output: "Атомарные изменения с чистой историей и меньшей нагрузкой на главный контекст.",
    guardrail: "Не мешай исполнению ручным хаосом. Главный поток нужен для контроля и приемки."
  },
  {
    id: "verify",
    label: "Verify",
    command: "/gsd-verify-work 1",
    purpose: "Проводит приемку результата и превращает поломки в диагностированный fix-план.",
    when: "Код собран, но еще нельзя честно говорить, что он работает.",
    output: "Список подтверждений, дефектов и следующих исправлений.",
    guardrail: "Работает только то, что проверено. Зеленый запуск не равен готовому продукту."
  },
  {
    id: "ship",
    label: "Ship",
    command: "/gsd-ship 1",
    purpose: "Упаковывает проверенную фазу в PR и закрывает кусок работы.",
    when: "Фаза прошла приемку, история понятная, изменения готовы к передаче.",
    output: "PR, архивированная фаза и понятная точка продолжения.",
    guardrail: "Не тащи незавершенность в следующий milestone. Закрой фазу или явно верни ее в fix."
  }
];

export const gsdPrinciples: GsdPrinciple[] = [
  {
    id: "context",
    title: "Чистый контекст",
    description: "Главное окно не пухнет до состояния каши: тяжелая работа уходит в свежие контексты исполнителей."
  },
  {
    id: "memory",
    title: "Память в артефактах",
    description: "Решения живут в структурированных файлах, поэтому новая сессия понимает проект без гадания."
  },
  {
    id: "verification",
    title: "Верификация перед уверенностью",
    description: "Фаза считается рабочей после приемки, а не после ощущения, что код вроде бы запустился."
  }
];

export const gsdPipelineExample = {
  productName: "Клиентский портал для онбординга",
  premise: "Как провести продукт через GSD-команды от первого контекста до PR.",
  steps: [
    {
      id: "new-project",
      command: "/gsd-new-project",
      phase: "Старт продукта",
      when: "Есть идея портала, но еще нет требований, фаз и границ MVP.",
      output: "Проектный контекст, вопросы, roadmap и первая рабочая фаза.",
      example: "Запусти /gsd-new-project и зафиксируй, что MVP должен собрать документы, статусы и следующий шаг клиента."
    },
    {
      id: "discuss",
      command: "/gsd-discuss-phase 1",
      phase: "Разбор фазы",
      when: "Первая фаза названа, но решения по ролям, экранам и ошибкам еще серые.",
      output: "Список решений, открытых вопросов и уточнений для плана.",
      example: "Запусти /gsd-discuss-phase 1 и реши, что видит клиент, менеджер и админ."
    },
    {
      id: "plan",
      command: "/gsd-plan-phase 1",
      phase: "Планирование",
      when: "Обсуждение завершено, пора нарезать фазу на проверяемые задачи.",
      output: "Планы для исполнителей, тестовые gates и порядок выполнения.",
      example: "Запусти /gsd-plan-phase 1 и получи задачи для модели данных, UI списка документов и статусов."
    },
    {
      id: "execute",
      command: "/gsd-execute-phase 1",
      phase: "Исполнение",
      when: "План проверен и можно отдавать задачи в свежие рабочие контексты.",
      output: "Атомарные изменения, выполненные по планам фазы.",
      example: "Запусти /gsd-execute-phase 1 и держи главный поток на приемке, а не на ручной сборке каждого файла."
    },
    {
      id: "verify",
      command: "/gsd-verify-work 1",
      phase: "Приемка",
      when: "Код появился, но еще нет доказательств, что портал работает как продукт.",
      output: "Подтверждения, дефекты и fix-план для незакрытых проблем.",
      example: "Запусти /gsd-verify-work 1 и преврати найденные дефекты в fix-план."
    },
    {
      id: "ship",
      command: "/gsd-ship 1",
      phase: "Передача",
      when: "Фаза прошла приемку, история чистая, изменения готовы к PR.",
      output: "PR, архив фазы и понятная точка продолжения.",
      example: "Запусти /gsd-ship 1 и закрой фазу так, чтобы следующий milestone стартовал без раскопок."
    }
  ] satisfies GsdPipelineStep[]
};

export const gsdAdvancedCommands: GsdAdvancedCommand[] = [
  {
    id: "new-milestone",
    name: "New Milestone",
    command: "/gsd-new-milestone",
    category: "Lifecycle",
    description: "Стартует следующий виток продукта: обновляет проектный контекст, требования, roadmap и состояние."
  },
  {
    id: "spec-phase",
    name: "SID / Spec Phase",
    command: "/gsd-spec-phase",
    category: "Clarity",
    description: "Фиксирует что и зачем должна дать фаза: вопросы, оценка неоднозначности, SPEC.md до обсуждения реализации."
  },
  {
    id: "quick",
    name: "Quick",
    command: "/gsd-quick",
    category: "Fast lane",
    description: "Для небольших задач без полного milestone-ритуала: план, исполнение, атомарный след в .planning/quick."
  },
  {
    id: "spike",
    name: "Spike",
    command: "/gsd-spike",
    category: "Exploration",
    description: "Проверяет техническую гипотезу через 2-5 коротких экспериментов с verdict: validated, invalidated или partial."
  },
  {
    id: "sketch",
    name: "Sketch",
    command: "/gsd-sketch",
    category: "Design",
    description: "Делает 2-3 throwaway HTML-варианта UI, чтобы выбрать направление до продакшен-кода."
  },
  {
    id: "map-codebase",
    name: "Map Codebase",
    command: "/gsd-map-codebase",
    category: "Context",
    description: "Картирует существующий код через mapper-агентов: архитектура, качество, риски и быстрый поиск по intel."
  },
  {
    id: "workstreams",
    name: "Workstreams",
    command: "/gsd-workstreams",
    category: "Parallel",
    description: "Ведет несколько независимых направлений работы внутри одного проекта с отдельным состоянием и прогрессом."
  },
  {
    id: "debug",
    name: "Debug",
    command: "/gsd-debug",
    category: "Diagnostics",
    description: "Системная отладка с постоянной памятью: гипотезы, evidence, продолжение сессии и TDD-gate при необходимости."
  },
  {
    id: "capture",
    name: "Capture",
    command: "/gsd-capture",
    category: "Backlog",
    description: "Паркует идеи, заметки, backlog и seeds, чтобы не ломать текущую фазу случайным отвлечением."
  },
  {
    id: "code-review",
    name: "Code Review",
    command: "/gsd-code-review",
    category: "Quality",
    description: "Ревьюит изменения фазы на баги, безопасность и качество; может запускать fix-цикл."
  },
  {
    id: "secure-phase",
    name: "Secure Phase",
    command: "/gsd-secure-phase",
    category: "Security",
    description: "Проверяет threat mitigations для выполненной фазы и пишет SECURITY.md с результатами аудита."
  },
  {
    id: "graphify",
    name: "Graphify",
    command: "/gsd-graphify",
    category: "Knowledge",
    description: "Строит и обновляет knowledge graph проекта: можно искать связи, свежесть и изменения по коду."
  }
];
