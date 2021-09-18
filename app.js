class Tooltip {
  ref = { current: null };
  tooltip = { current: null };

  texts={
    red: 'Red is the color at the long wavelength end of the visible spectrum of light, next to orange and opposite violet. It has a dominant wavelength of approximately 625–740 nanometres.',
    green: 'Green is the color between blue and yellow on the visible spectrum. It is evoked by light which has a dominant wavelength of roughly 495–570 nm.',
    blue: 'Blue is one of the three primary colours of pigments in painting and traditional colour theory, as well as in the RGB colour model. It lies between violet and green on the spectrum of visible light. The eye perceives blue when observing light with a dominant wavelength between approximately 450 and 495 nanometres.'
  }
  
  constructor(element, dataset) {
    this.element = element;
    this.dataset = dataset;
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseMove = this.mouseMove.bind(this);

    this.element.addEventListener('mouseover', this.mouseOver);
    this.element.addEventListener('mouseout', this.mouseOut);
  }

  mouseOver(event) {
    const box = event.target.dataset.box;
    const element = document.querySelector(`[data-box=${box}]`);
    this.ref.current = element;
    this.createToolTip(element, box);

    element.addEventListener('mousemove', this.mouseMove);
  }

  mouseOut() {
    this.clearMouseMove();
    this.removeToolTip();
  }

  mouseMove(event) {
    const y = event.offsetY;
    const x = event.offsetX;
    this.setStyle(this.tooltip.current, {
      top: y + 'px',
      left: x + 20 + 'px'
    })
  }

  clearMouseMove() {
    this.ref.current.removeEventListener('mousemove', this.mouseMove);
  }

  createToolTip(parentNode, type) {
    this.tooltip.current = document.createElement('div');
    this.tooltip.current.className = `tooltip tooltip_${type}`;
    this.tooltip.current.innerHTML = this.texts[type];
    parentNode.appendChild(this.tooltip.current);
    return this.tooltip.current;
  }

  removeToolTip(){
    this.tooltip.current.remove();
    this.tooltip.current = null;
  }

  setStyle(element, styles) {
    return Object.assign(element.style, styles);
  }
}

new Tooltip(document.querySelector('.red'));