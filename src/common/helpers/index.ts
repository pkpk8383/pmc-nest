/**
 * Template helper functions for Handlebars views
 */
export function formatYear(): number {
  return new Date().getFullYear();
}

export function isActive(currentPath: string, targetPath: string): boolean {
  return currentPath === targetPath;
}
