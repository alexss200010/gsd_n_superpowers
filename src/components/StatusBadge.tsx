import type { ArtifactStatus, WorkflowStatus } from "../types";

interface StatusBadgeProps {
  status: WorkflowStatus | ArtifactStatus;
}

const statusLabels: Record<WorkflowStatus | ArtifactStatus, string> = {
  complete: "завершено",
  active: "активно",
  next: "следующее",
  gated: "закрыто",
  pending: "ожидает",
  created: "создано",
  blocked: "заблокировано"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status}`}>{statusLabels[status]}</span>;
}
