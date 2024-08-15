export function prepare_element(selector, element_type, header_text) {
  let parent = null;
  if (typeof selector === "string") {
    parent = document.querySelector(selector);
  } else {
    parent = selector;
  }
  let element = document.createElement(element_type);
  element.textContent = header_text;
  parent.appendChild(element);
  return element;
}
