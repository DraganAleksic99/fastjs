import { removeListeners } from "./events.js";
import { DOM_TYPES } from "./h.js";

function destroyDOM(vdomNode) {
  switch (vdomNode.type) {
    case DOM_TYPES.TEXT: {
      removeTextNode(vdomNode);
      break;
    }
    case DOM_TYPES.FRAGMENT: {
      removeFragmentNode(vdomNode);
      break;
    }
    case DOM_TYPES.ELEMENT: {
      removeElementNode(vdomNode);
      break;
    }
    default: {
      throw new Error(`Can't destroy DOM of type: ${type}`);
    }
  }
  delete vdomNode.el;
}

function removeTextNode(vdomNode) {
  vdomNode.el.remove();
}

function removeElementNode(vdomNode) {
  const { el, children, listeners } = vdomNode;

  el.remove();
  children.forEach(destroyDOM);

  if (listeners) {
    removeListeners(listeners, el);
    delete vdomNode.listeners;
  }
}

function removeFragmentNode(vdomNode) {
  vdomNode.children.forEach(destroyDOM);
}

export { destroyDOM };
