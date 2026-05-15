import type {
  CheatSheetAdvancedCommand,
  CheatSheetCommand,
  CheatSheetPipelineStep,
  CheatSheetPrinciple
} from "../types";

export const gitCommands: CheatSheetCommand[] = [
  {
    id: "init",
    label: "Init",
    command: "git init",
    purpose: "Создаёт новый репозиторий в текущей папке или клонирует существующий.",
    when: "Старт нового проекта или подключение к чужому через git clone <url>.",
    output: "Скрытая папка .git со всей историей и настройками.",
    guardrail: "Не делай git init поверх уже существующего репозитория — потеряешь связку с remote."
  },
  {
    id: "status",
    label: "Status",
    command: "git status",
    purpose: "Показывает, какие файлы изменены, какие в staging, на какой ты ветке.",
    when: "Перед каждым add и commit — чтобы видеть, что попадёт в снимок.",
    output: "Список изменений по трём корзинам: staged, modified, untracked.",
    guardrail: "Никогда не коммить вслепую. Сначала status, потом add, потом ещё раз status."
  },
  {
    id: "add",
    label: "Add",
    command: "git add <path>",
    purpose: "Переносит изменения в staging — это будущий снимок коммита.",
    when: "Решил, что часть правок готова к фиксации.",
    output: "Файлы в зелёном списке staged в git status.",
    guardrail: "Избегай git add . без проверки. Лучше git add -p — выбираешь куски руками."
  },
  {
    id: "commit",
    label: "Commit",
    command: 'git commit -m "message"',
    purpose: "Создаёт атомарный снимок — точку, в которую можно откатиться.",
    when: "Когда staging содержит одно завершённое логическое изменение.",
    output: "Новый коммит с SHA и сообщением в истории текущей ветки.",
    guardrail: "Одно изменение — один коммит. Сообщение в imperative: \"add login form\", не \"added\"."
  },
  {
    id: "pull",
    label: "Pull",
    command: "git pull --rebase",
    purpose: "Забирает новые коммиты с remote и встраивает их в твою ветку.",
    when: "Перед началом работы и перед push — чтобы не словить расхождение веток.",
    output: "Локальная ветка догнала remote, твои коммиты сверху.",
    guardrail: "Используй --rebase, чтобы не плодить merge-коммиты. На общей ветке — не rebase."
  },
  {
    id: "push",
    label: "Push",
    command: "git push -u origin <branch>",
    purpose: "Отправляет локальные коммиты на remote и делает их доступными команде.",
    when: "Когда локальная ветка содержит коммиты, которых ещё нет на remote.",
    output: "Remote-ветка обновлена, можно открывать Pull Request.",
    guardrail: "Никогда git push --force на shared-ветку. Только --force-with-lease на свою feature-ветку."
  }
];

export const gitPrinciples: CheatSheetPrinciple[] = [
  {
    id: "atomic",
    title: "Атомарные коммиты",
    description: "Один коммит — одно завершённое изменение. Так история читается, бьётся на куски и легко откатывается."
  },
  {
    id: "branches",
    title: "Работа в ветках",
    description: "Любая фича, фикс или эксперимент живёт в отдельной ветке. main всегда стабилен и собирается."
  },
  {
    id: "history",
    title: "Чистая история",
    description: "История — это документация. Понятные сообщения, rebase до push, без \"fix typo\" и \"wip\" в main."
  }
];

export const gitPipelineExample = {
  productName: "Feature: страница входа",
  premise: "Как провести изменение от создания ветки до merge в main без сюрпризов.",
  steps: [
    {
      id: "branch",
      command: "git switch -c feature/login",
      phase: "Изоляция",
      when: "Задача определена, main стабилен, пора отделить работу в свою ветку.",
      output: "Новая локальная ветка feature/login, отходящая от текущей точки main.",
      example: "Создай feature/login и сразу обнови с main: git fetch origin && git rebase origin/main."
    },
    {
      id: "stage",
      command: "git add -p",
      phase: "Стейджинг",
      when: "Кусок логики готов, но в правках смешалось несколько идей.",
      output: "Только выбранные hunk'и попадают в staging — остальное ждёт следующего коммита.",
      example: "Запусти git add -p и отбери только изменения формы логина, временные console.log оставь снаружи."
    },
    {
      id: "commit",
      command: 'git commit -m "feat: add login form"',
      phase: "Фиксация",
      when: "В staging — одно логическое изменение с понятным заголовком.",
      output: "Атомарный коммит с conventional-commits префиксом и осмысленным сообщением.",
      example: "Закоммить форму одним коммитом, валидацию — следующим. Не смешивай в один \"various changes\"."
    },
    {
      id: "push",
      command: "git push -u origin feature/login",
      phase: "Публикация",
      when: "На ветке есть один-два коммита, пора показать команде или собрать CI.",
      output: "Remote-ветка создана, CI стартовал, можно открывать draft PR.",
      example: "Запушь и открой draft PR — пусть линтеры и тесты гоняются параллельно, пока ты дописываешь."
    },
    {
      id: "sync",
      command: "git pull --rebase origin main",
      phase: "Синхронизация",
      when: "В main появились новые коммиты, а твоя ветка отстала — перед merge нужно догнать.",
      output: "Твои коммиты переносятся поверх свежего main, история линейная.",
      example: "Перед открытием PR на merge — обязательный rebase на main. Конфликты решай локально, не в UI."
    },
    {
      id: "merge",
      command: "git merge --no-ff feature/login",
      phase: "Слияние",
      when: "PR одобрен, CI зелёный, ветка догнала main.",
      output: "Изменение в main одним merge-коммитом, feature-ветка можно удалить.",
      example: "После merge: git branch -d feature/login локально и git push origin --delete feature/login на remote."
    }
  ] satisfies CheatSheetPipelineStep[]
};

export const gitAdvancedCommands: CheatSheetAdvancedCommand[] = [
  {
    id: "switch-create",
    name: "Switch Create",
    command: "git switch -c <name>",
    category: "Branching",
    description: "Создаёт новую ветку от текущей точки и сразу переключается на неё. Современная замена checkout -b."
  },
  {
    id: "branch-delete",
    name: "Branch Delete",
    command: "git branch -d <name>",
    category: "Branching",
    description: "Удаляет локальную ветку после merge. Флаг -D удалит даже несмерженную — используй осознанно."
  },
  {
    id: "commit-amend",
    name: "Amend",
    command: "git commit --amend",
    category: "History",
    description: "Переписывает последний коммит: добавить забытые файлы или поправить сообщение. До push — безопасно."
  },
  {
    id: "rebase-interactive",
    name: "Interactive Rebase",
    command: "git rebase -i HEAD~N",
    category: "History",
    description: "Редактирует последние N коммитов: squash, reorder, reword. Чистка истории перед merge в main."
  },
  {
    id: "cherry-pick",
    name: "Cherry-pick",
    command: "git cherry-pick <sha>",
    category: "History",
    description: "Переносит конкретный коммит из одной ветки в другую. Полезно для хотфиксов из main в release."
  },
  {
    id: "stash-push",
    name: "Stash",
    command: 'git stash push -m "msg"',
    category: "Stash",
    description: "Прячет незакоммиченные изменения в stack, оставляя рабочее дерево чистым. С -u — включая untracked."
  },
  {
    id: "stash-pop",
    name: "Stash Pop",
    command: "git stash pop",
    category: "Stash",
    description: "Возвращает последний stash обратно в рабочее дерево и удаляет его из стека."
  },
  {
    id: "reflog",
    name: "Reflog",
    command: "git reflog",
    category: "Recovery",
    description: "История всех движений HEAD за 90 дней. Сюда смотришь, когда \"потерял\" коммит после ребейза или reset."
  },
  {
    id: "reset-soft",
    name: "Soft Reset",
    command: "git reset --soft HEAD~1",
    category: "Recovery",
    description: "Откатывает последний коммит, но изменения остаются в staging. Удобно, чтобы пересобрать коммит заново."
  },
  {
    id: "revert",
    name: "Revert",
    command: "git revert <sha>",
    category: "Recovery",
    description: "Создаёт новый коммит, отменяющий изменения указанного. Безопасно для shared-веток — в отличие от reset."
  },
  {
    id: "log-graph",
    name: "Log Graph",
    command: "git log --oneline --graph --all",
    category: "Inspection",
    description: "ASCII-граф всех веток в одной картинке. Главный инструмент, чтобы понять, что вообще происходит."
  },
  {
    id: "bisect",
    name: "Bisect",
    command: "git bisect start",
    category: "Inspection",
    description: "Бинарный поиск коммита, который сломал поведение. Помечаешь good/bad — git сам сужает диапазон."
  }
];
