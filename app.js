class Tooltip {
  ref = { current: null };
  tooltip = { current: null };
  timeouts = {};

  data = {
    red: 'Red is the color at the long wavelength end of the visible spectrum of light, next to orange and opposite violet. It has a dominant wavelength of approximately 625–740 nanometres.',
    orange: 'Orange is the colour between yellow and red on the spectrum of visible light. Human eyes perceive orange when observing light with a dominant wavelength between roughly 585 and 620 nanometres.',
    yellow: 'Yellow is the color between orange and green on the spectrum of visible light. It is evoked by light with a dominant wavelength of roughly 575–585 nm.',
    green: 'Green is the color between blue and yellow on the visible spectrum. It is evoked by light which has a dominant wavelength of roughly 495–570 nm.',
    ['celestial-blue']: 'Celestial Blue is a dark, shaded, indigo blue with a cobalt undertone. It is a perfect paint color for a foyer. Pair it with lighter blue or soft yellow-tan walls.',
    blue: 'Blue is one of the three primary colours of pigments in painting and traditional colour theory, as well as in the RGB colour model. It lies between violet and green on the spectrum of visible light. The eye perceives blue when observing light with a dominant wavelength between approximately 450 and 495 nanometres.',
    purple: 'Purple combines the calm stability of blue and the fierce energy of red. The color purple is often associated with royalty, nobility, luxury, power, and ambition. Purple also represents meanings of wealth, extravagance, creativity, wisdom, dignity, grandeur, devotion, peace, pride, mystery, independence, and magic.'
  }

  constructor(element, dataset) {
    this.element = element;
    this.dataset = dataset;

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseClick = this.mouseClick.bind(this);

    this.element.addEventListener('mouseover', this.mouseOver);
    this.element.addEventListener('mouseout', this.mouseOut);
    this.element.addEventListener('click', this.mouseClick);
  }

  mouseClick(event) {
    event.preventDefault();
    const box = event.target.dataset.box;
    if (this.timeouts[box]) {
      clearTimeout(this.timeouts[box]);
    }
    const element = document.querySelector(`[data-box=${box}]`);
    element.classList.toggle('highlighted');

    this.timeouts[box] = setTimeout(() => {
      if (element.classList.contains('highlighted')) {
        element.classList.remove('highlighted');
      }
    }, 3000);
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
      top: y + 20 + 'px',
      left: x + 20 + 'px'
    })
  }

  clearMouseMove() {
    this.ref.current.removeEventListener('mousemove', this.mouseMove);
  }

  createToolTip(parentNode, type) {
    this.tooltip.current = document.createElement('div');
    this.tooltip.current.className = `tooltip tooltip_${type}`;
    this.tooltip.current.innerHTML =
      `
    <img class='tooltip__image' src='./assets/${type}.jpg' />
      <div class='tooltip__text' style="color: ${type === 'yellow' || type === 'orange' ? 'black' : 'white'};">
        ${this.data[type]}
      </div>
    `;
    parentNode.appendChild(this.tooltip.current);
    return this.tooltip.current;
  }

  removeToolTip() {
    this.tooltip.current.remove();
    this.tooltip.current = null;
  }

  setStyle(element, styles) {
    return Object.assign(element.style, styles);
  }
}

document.querySelectorAll('.red').forEach(item => {
  new Tooltip(item);
});