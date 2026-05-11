import { Sparkles } from "lucide-react";
import type { WorkflowStage } from "../types";

interface DashboardHeaderProps {
  activeStage: WorkflowStage;
}

export function DashboardHeader({ activeStage }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__brand">
        <Sparkles aria-hidden="true" size={22} />
        <div>
          <h1>Прогресс Superpowers</h1>
          <p>Локальная панель рабочего процесса для разработки через навыки.</p>
        </div>
      </div>
      <div className="dashboard-header__summary" aria-label="Текущий этап работы">
        <span>Текущий этап</span>
        <strong>{activeStage.label}</strong>
      </div>
    </header>
  );
}
