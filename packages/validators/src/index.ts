export function isAllowedFileType(type: string, allowed: string[]): boolean {
  return allowed.includes(type);
}
