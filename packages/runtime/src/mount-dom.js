import { DOM_TYPES } from "./h.js";
import { addEventListeners } from "./events.js";
import { setAttributes } from "./attributes.js";

function mountDOM(vdomNode, parentEl) {
  console.log(vdomNode);
  switch (vdomNode.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdomNode, parentEl);
      break;
    }
    case DOM_TYPES.ELEMENT: {
      createElementNode(vdomNode, parentEl);
      break;
    }
    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdomNode, parentEl);
      break;
    }
    default: {
      throw new Error(`Can't mount node of element ${vdomNode.type}`);
    }
  }
}

function createTextNode(vdomNode, parentEl) {
  const textNode = document.createTextNode(vdomNode.value);
  vdomNode.el = textNode;

  parentEl.append(textNode);
}

function createFragmentNode(vdomNode, parentEl) {
  vdomNode.el = parentEl;
  vdomNode.children.forEach((child) => mountDOM(child, parentEl));
}

function createElementNode(vdomNode, parentEl) {
  const { tag, props, children } = vdomNode;
  const element = document.createElement(tag);

  addProps(element, props, vdomNode);
  vdomNode.el = element;

  children.forEach((child) => mountDOM(child, element));
  parentEl.append(element);
}

function addProps(element, props, vdomNode) {
  const { on: events, ...restAttributes } = props;

  vdomNode.listeners = addEventListeners(events, element);
  setAttributes(element, restAttributes);
}

export { mountDOM };
