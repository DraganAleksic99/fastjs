function addEventListener(eventName, handler, element) {
  element.addEventListener(eventName, handler);
  return handler;
}

function addEventListeners(events = {}, element) {
  const addedListeners = {};

  Object.entries(events).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, element);
    addedListeners[eventName] = listener;
  });

  return addedListeners;
}

function removeListeners(events = {}, element) {
  Object.entries(events).forEach(([eventName, handler]) => {
    element.removeEventListener(eventName, handler);
  });
}

export { addEventListeners, removeListeners };
