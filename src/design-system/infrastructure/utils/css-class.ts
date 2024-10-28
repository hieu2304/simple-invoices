import { isString, isObject } from "./validators";
import { toHypenCase } from "./formaters";
import { Nullable } from "./models";

export function getCssClass(
  ...targets: Array<Nullable<string> | { [key: string]: Nullable<boolean> }>
): string {
  const cssClassSet = targets.reduce((result: Set<string>, value) => {
    if (!value) {
      return result;
    }

    if (isString(value)) {
      value.split(" ").forEach((item: string) => {
        if (item) {
          result.add(item);
        }
      });
    } else if (isObject(value)) {
      Object.keys(value).forEach((key) => {
        if (value[key]) {
          result.add(toHypenCase(key));
        }
      });
    }

    return result;
  }, new Set<string>());

  return Array.from(cssClassSet).join(" ");
}
