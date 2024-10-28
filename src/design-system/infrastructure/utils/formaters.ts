export function toCamelCase(target: string): string {
  return target.replace(/(-[a-z])/g, (char) =>
    char.toUpperCase().replace("-", "")
  );
}

export function toHypenCase(target: string): string {
  return target
    .replace(/([A-Z])/g, (char) => `-${char.toLowerCase()}`)
    .split("-")
    .filter((item) => !!item)
    .join("-");
}
