export default class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          text-align: center;
          padding: 1rem 2rem;
        }
        a {
          color: inherit;
        }
      </style>
      <footer>
        Crafted by <a href="https://github.com/heybran">@heybran</a>
      </footer>
    `; 
  }
}

customElements.define('cc-footer', Footer);