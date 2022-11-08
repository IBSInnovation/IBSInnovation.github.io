export function getUnixOfToday() {
  return (
    String(new Date().toLocaleDateString()).replaceAll("/", "-") +
    " " +
    new Date().toLocaleTimeString()
  );
}
