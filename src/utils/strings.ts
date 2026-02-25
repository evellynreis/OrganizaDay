const ELLIPSIS = "...";

export function truncateFileName(name: string, maxLength = 32): string {
  if (!name || name.length <= maxLength) return name;
  const rest = maxLength - ELLIPSIS.length;
  const startChars = Math.ceil(rest / 2);
  const endChars = rest - startChars;
  return `${name.slice(0, startChars)}${ELLIPSIS}${name.slice(-endChars)}`;
}
