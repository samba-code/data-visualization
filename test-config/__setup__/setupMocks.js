// Allow overriding an element's width/height
Object.defineProperty(global.Element.prototype, "clientWidth", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 800
});

Object.defineProperty(global.Element.prototype, "clientHeight", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 600
});

window.SVGElement.prototype.getBBox = jest.fn(() => ({
  width: 50,
  height: 20
}));
