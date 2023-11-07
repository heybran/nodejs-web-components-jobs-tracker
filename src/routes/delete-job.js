import "cucumber-components/src/components/form-layout/form-layout.js";
import "cucumber-components/src/components/text-field/text-field.js";
import "cucumber-components/src/components/date-picker/date-picker.js";
import "cucumber-components/src/components/option/option.js";
import "cucumber-components/src/components/select/select.js";
import "cucumber-components/src/components/textarea/textarea.js";
import "cucumber-components/src/components/checkbox/checkbox.js";
import "cucumber-components/src/components/button/button.js";
import "cucumber-components/src/components/dialog/dialog.js";

export default class DeleteJob extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    let search = new URLSearchParams(location.search);
    let id = search.get("id");
    let website = search.get('website');
    
    this.shadowRoot.innerHTML = `
      <cc-dialog label="Are you sure you want to delete this job?">
        You are about to delete job of ${website}.
        <cc-button 
          theme="primary" 
          slot="footer-actions-right"
          onclick="this.getRootNode().host.deleteJob('${id}');"
        >Confirm</cc-button>
      </cc-dialog>
    `;
    this.shadowRoot.querySelector('cc-dialog').show();
  }

  /**
   * @param {string} id
   */
  deleteJob(id) {
    const submitButton = this.shadowRoot?.querySelector('cc-button');
    submitButton?.setAttribute('loading', '');
  
    fetch('/api/jobs/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    .then(res => {
      // Handle the response from the server
      if (res.ok) {
        ROUTER.redirect('/jobs');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the request
    }).finally(() => {
      submitButton?.removeAttribute('loading');
    });
  }
}

customElements.define('delete-job', DeleteJob);