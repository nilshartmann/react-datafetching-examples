export function dateTimeString(isoString: string | undefined) {
  if (!isoString) {
    return "";
  }
  const date = Date.parse(isoString);

  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
