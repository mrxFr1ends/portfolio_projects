export function deepEqual(x, y) {
  if (
    typeof x !== "object" ||
    x === null ||
    typeof y !== "object" ||
    y === null
  ) {
    return Object.is(x, y);
  }
  if (x === y) return true;
  const keys = Object.keys(x);
  if (Object.keys(y).length !== keys.length) return false;
  for (const key of keys) {
    if (
      !Object.prototype.propertyIsEnumerable.call(y, key) ||
      !deepEqual(x[key], y[key])
    ) {
      return false;
    }
  }
  return true;
}
