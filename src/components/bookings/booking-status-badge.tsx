import { Badge } from "@/components/ui/badge"
import type { BookingStatus } from "@/lib/AllTypes"

const statusStyles: Record<BookingStatus, string> = {
  Pending:
    "border-amber-300/70 bg-amber-100 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-200",
  Confirmed:
    "border-sky-300/70 bg-sky-100 text-sky-900 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-200",
  Completed:
    "border-emerald-300/70 bg-emerald-100 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-200",
  Cancelled:
    "border-rose-300/70 bg-rose-100 text-rose-900 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-200",
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1.5 text-[10px] font-semibold ${statusStyles[status] ?? statusStyles.Pending}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  )
}
