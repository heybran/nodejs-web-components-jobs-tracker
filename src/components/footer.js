export default class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: .5rem;
        }
        a {
          color: inherit;
        }
      </style>
      <footer>
        <p>Crafted by <a href="https://github.com/heybran">@heybran.</a></p>
        <p>Logo icon is downloaded from <a href="https://icons8.com/">Icons8</a>.</p>
      </footer>
    `; 
  }
}

customElements.define('cc-footer', Footer);