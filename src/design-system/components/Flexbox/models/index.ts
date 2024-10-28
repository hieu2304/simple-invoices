export interface IFlexBaseProps {
  className?: string;
  style?: object;
  w?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  h?: number | string;
  m?: number | string;
  mx?: number | string;
  my?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  p?: number | string;
  px?: number | string;
  py?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  borderRadius?: number | string;
  flexWrap?: boolean;
  column?: boolean;
  auto?: boolean;
  order?: number;
  grow?: number;
  shrink?: number;
  basis?: "auto" | "unset" | number;
  align?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
  alignSelf?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
}

export interface IFlexProps extends IFlexBaseProps {
  gap?: number;
}

export interface IBoxProps extends IFlexBaseProps {
  flex?: boolean;
}
