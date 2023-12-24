import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `Created ${entityType}: "${entityTitle}"`;
    case ACTION.UPDATE:
      return `Updated ${entityType}: "${entityTitle}"`;
    case ACTION.DELETE:
      return `Deleted ${entityType}: "${entityTitle}"`;
    default:
      return `Unknown ${entityType}: "${entityTitle}"`;
  }
};
