import { isNumber, isNotEmpty } from "../../../infrastructure/utils/validators";
import { IFlexProps, IBoxProps } from "../models";

export function mixFlexbox(props: IBoxProps | IFlexProps): string {
  const {
    w,
    h,
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    minWidth,
    maxWidth,
    flexWrap,
    grow,
    shrink,
    basis,
    column,
    auto,
    order,
    align,
    alignSelf,
    justify,
    borderRadius,
  } = props;

  return `
      & {
        flex-wrap: ${flexWrap ? "wrap" : ""};
        flex-direction: ${column ? "column" : ""};
        flex: ${auto ? "1 1 auto" : ""};
        flex-grow: ${isNumber(grow) ? grow : ""};
        flex-shrink: ${isNumber(shrink) ? shrink : ""};
        flex-basis: ${isNumber(basis) || isNotEmpty(basis) ? basis : ""};
        order: ${isNumber(order) ? order : ""};
        align-items: ${align || ""};
        align-self: ${alignSelf || ""};
        justify-content: ${justify || ""};
        width: ${w ? `${w}${isNumber(w) ? "px" : ""}` : ""};
        max-width: ${
          maxWidth ? `${maxWidth}${isNumber(maxWidth) ? "px" : ""}` : ""
        };
        min-width: ${
          minWidth ? `${minWidth}${isNumber(minWidth) ? "px" : ""}` : ""
        };
        border-radius: ${
          borderRadius
            ? `${borderRadius}${isNumber(borderRadius) ? "px" : ""}`
            : ""
        };
        height: ${h ? `${h}${isNumber(h) ? "px" : ""}` : ""};
        ${mixMargin({ m, mx, my, mt, mb, ml, mr })}
        ${mixPadding({ p, px, py, pt, pb, pl, pr })}
      }
    `;
}

function mixMargin({
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
}: {
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
}): string {
  const margins: {
    "margin-top"?: string;
    "margin-left"?: string;
    "margin-bottom"?: string;
    "margin-right"?: string;
  } = {};

  if (mt) {
    margins["margin-top"] = `${mt}${isNumber(mt) ? "px" : ""}`;
  }
  if (ml) {
    margins["margin-left"] = `${ml}${isNumber(ml) ? "px" : ""}`;
  }
  if (mb) {
    margins["margin-bottom"] = `${mb}${isNumber(mb) ? "px" : ""}`;
  }
  if (mr) {
    margins["margin-right"] = `${mr}${isNumber(mr) ? "px" : ""}`;
  }
  if (mx) {
    const value = `${mx}${isNumber(mx) ? "px" : ""}`;
    margins["margin-left"] = value;
    margins["margin-right"] = value;
  }
  if (my) {
    const value = `${my}${isNumber(my) ? "px" : ""}`;
    margins["margin-top"] = value;
    margins["margin-bottom"] = value;
  }
  if (m) {
    const value = `${m}${isNumber(m) ? "px" : ""}`;
    margins["margin-top"] = value;
    margins["margin-bottom"] = value;
    margins["margin-left"] = value;
    margins["margin-right"] = value;
  }

  const props = Object.keys(margins).filter((key) => !!key);

  if (props.length === 0) {
    return "";
  } else if (props.length === 4) {
    const top = margins["margin-top"];
    const bottom = margins["margin-bottom"];
    const left = margins["margin-left"];
    const right = margins["margin-right"];

    if (top === bottom && top === right && top === left) {
      return `margin: ${top};`;
    } else if (top === bottom && right === left && top !== right) {
      return `margin: ${top} ${right};`;
    } else {
      return `margin: ${top} ${right} ${bottom} ${left};`;
    }
  } else {
    return props.map((key) => `${key}: ${margins[key]};`).join("");
  }
}

function mixPadding({
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
}: {
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
}): string {
  const paddings: {
    "padding-top"?: string;
    "padding-left"?: string;
    "padding-bottom"?: string;
    "padding-right"?: string;
  } = {};

  if (pt) {
    paddings["padding-top"] = `${pt}${isNumber(pt) ? "px" : ""}`;
  }
  if (pl) {
    paddings["padding-left"] = `${pl}${isNumber(pl) ? "px" : ""}`;
  }
  if (pb) {
    paddings["padding-bottom"] = `${pb}${isNumber(pb) ? "px" : ""}`;
  }
  if (pr) {
    paddings["padding-right"] = `${pr}${isNumber(pr) ? "px" : ""}`;
  }
  if (px) {
    const value = `${px}${isNumber(px) ? "px" : ""}`;
    paddings["padding-left"] = value;
    paddings["padding-right"] = value;
  }
  if (py) {
    const value = `${py}${isNumber(py) ? "px" : ""}`;
    paddings["padding-top"] = value;
    paddings["padding-bottom"] = value;
  }
  if (p) {
    const value = `${p}${isNumber(p) ? "px" : ""}`;
    paddings["padding-top"] = value;
    paddings["padding-bottom"] = value;
    paddings["padding-left"] = value;
    paddings["padding-right"] = value;
  }

  const props = Object.keys(paddings).filter((key) => !!key);

  if (props.length === 0) {
    return "";
  } else if (props.length === 4) {
    const top = paddings["padding-top"];
    const bottom = paddings["padding-bottom"];
    const left = paddings["padding-left"];
    const right = paddings["padding-right"];

    if (top === bottom && top === right && top === left) {
      return `padding: ${top};`;
    } else if (top === bottom && right === left && top !== right) {
      return `padding: ${top} ${right};`;
    } else {
      return `padding: ${top} ${right} ${bottom} ${left};`;
    }
  } else {
    return props.map((key) => `${key}: ${paddings[key]};`).join("");
  }
}
