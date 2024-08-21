import { withoutNulls } from "./utils/arrays.js";

// h(), hString() and hFragment() do the job of createElement() in React or h() in Vue.

/**
 * Defines the different types of DOM elements.
 * We create a Virtual DOM node for every real DOM node
 * @readonly
 * @enum {string}
 */
export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
};

/**
 * Creates a new Virtual DOM element node with the specified tag, properties, and children.
 * Virtual node is a lightweight representation of real DOM node.
 * @param {string} tag - The HTML tag name of the element.
 * @param {Object} [props={}] - The properties to be applied to the element.
 * @param {Array.<string|Object>} [children=[]] - The child nodes of the element.
 * @returns {Object} - A new Virtual DOM node object.
 */
const h = (tag, props = {}, children = []) => ({
  type: DOM_TYPES.ELEMENT,
  tag,
  props,
  children: mapTextNodes(withoutNulls(children)),
});

/**
 * Maps text nodes in the children array to a consistent format.
 * @param {Array.<string|Object>} children - The children to be mapped.
 * @returns {Array.<string|Object>} - The mapped children.
 */
const mapTextNodes = (children) => {
  return children.map((child) => {
    return typeof child === "string" ? hString(child) : child;
  });
};

/**
 * Creates a new Virtual DOM text node.
 * @param {string} text - The text content of the node.
 * @returns {Object} - A new Virtual DOM text node object.
 */
const hString = (text) => ({ type: DOM_TYPES.TEXT, value: text });

/**
 * Creates a new Virtual DOM fragment node with the specified children.
 * @param {Array.<string|Object>} children - The child nodes of the fragment.
 * @returns {Object} - A new Virtual DOM fragment node object.
 */
const hFragment = (children) => ({
  type: DOM_TYPES.FRAGMENT,
  children: mapTextNodes(withoutNulls(children)),
});

export { h, hString, hFragment };
