export default class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          border-bottom: 1px solid #e6e6e6;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        h1 {
          margin: 0;
        }
      </style>
      <header>
        <a href="/">
          <h1>Jobs Tracker</h1>
        </a>
        <cc-side-nav horizontal>
          <cc-side-nav-item path="/jobs/add">
            <cc-icon icon="plus-lg" slot="prefix"></cc-icon>
            Add a Job
          </cc-side-nav-item>
          <cc-side-nav-item path="/jobs">
            <cc-icon icon="table" slot="prefix"></cc-icon>
            Jobs
          </cc-side-nav-item>
          <style>
            cc-side-nav-item {
              --link-hover-color: var(--primary-color);
            }
          </style>
        </cc-side-nav>
      </header>
    `; 
  }
}

customElements.define('cc-header', Header);
