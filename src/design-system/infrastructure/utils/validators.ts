/* eslint-disable @typescript-eslint/no-explicit-any */

export function isString(target: any): target is string {
  return typeof target === "string";
}

export function isNull(target: any): boolean {
  return target === undefined || target === null;
}

export function isObject(target: any): target is { [key: string]: any } {
  return target !== null && typeof target === "object";
}

export function isNotNull(target: any): boolean {
  return !isNull(target);
}

export function isNumber(target: any): boolean {
  return isNotEmpty(target, true) && !isNaN(target);
}

export function isEmpty(
  target: any,
  ignoreWhiteSpace: boolean = false,
  noZero: boolean = false
): boolean {
  return (
    isNull(target) ||
    target === "" ||
    (ignoreWhiteSpace
      ? isString(target) && target.trim().length === 0
      : false) ||
    (noZero ? target === 0 : false)
  );
}

export function isNotEmpty(
  target: any,
  ignoreWhiteSpace: boolean = false,
  noZero: boolean = false
): boolean {
  return !isEmpty(target, ignoreWhiteSpace, noZero);
}
