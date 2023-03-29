import path from "path";

/** fromRootTo
 * @returns a string containing path from project root directory
 * @param pathTo destination path
 */
export function fromRootTo(pathTo: string): string {
  const result = path.join(__dirname, "../../", pathTo);
  return result;
}
