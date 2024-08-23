function setAttributes(element, attrs) {
  const { class: className, style, ...restAttrs } = attrs;

  if (className) {
    setClass(element, className);
  }

  if (style) {
    Object.entries(style).forEach(([prop, value]) => {
      setStyle(element, prop, value);
    });
  }

  for (const [name, value] of Object.entries(restAttrs)) {
    setAttribute(element, name, value);
  }
}

function setClass(element, className) {
  element.className = "";

  if (typeof className === "string") {
    element.className = className;
  }

  if (Array.isArray(className)) {
    element.classList.add(...className);
  }
}

function setStyle(element, styleName, styleValue) {
  element.style[styleName] = styleValue;
}

function removeStyle(element, styleName) {
  element.style[styleName] = null;
}

function setAttribute(element, attrName, attrValue) {
  if (attrValue == null) {
    removeAttribute(element, attrName);
  } else if (attrName.startsWith("data-")) {
    element.setAttribute(attrName, attrValue);
  } else {
    element[attrName] = attrValue;
  }
}

function removeAttribute(element, attrName) {
  element[attrName] = null;
  element.removeAttribute(attrName);
}

export { setAttributes };
