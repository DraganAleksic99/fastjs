import { withoutNulls } from "./utils/arrays.js";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

const h = (tag, props = {}, children = []) => ({
  type: DOM_TYPES.ELEMENT,
  tag,
  props,
  children: mapTextNodes(withoutNulls(children)),
});

const mapTextNodes = (children) => {
  return children.map((child) => {
    return typeof child === "string" ? hString(child) : child;
  });
};

const hString = (text) => ({ type: DOM_TYPES.TEXT, value: text });

const hFragment = (children) => ({
  type: DOM_TYPES.FRAGMENT,
  children: mapTextNodes(withoutNulls(children)),
});

export { h, hString, hFragment };
