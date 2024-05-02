import { formatDistanceToNow, parseISO } from "date-fns"

export const displayDate = (isoDate: string) => {
  const date = parseISO(isoDate)
  return formatDistanceToNow(date, { addSuffix: true })
}
