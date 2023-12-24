import { ActivityItem } from "@/components/modal/card/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return null;
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      organizationId: orgId
    }
  })

  return (
    <ol className="space-y-4 mt-4">
      <p className="hidden last:block text-xs text-center text-muted-foreground">
        활동 내역이 아직 없습니다
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} log={log} />
      ))}
    </ol>
  )
}

export default ActivityList

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[75%] h-14" />
    </ol>
  );
}