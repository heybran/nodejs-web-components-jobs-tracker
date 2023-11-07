export default class AddJob extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          max-width: max(50vw, 800px);
        }
      </style>
      <form method="post" onsubmit="this.getRootNode().host.addJob(event);">
        <cc-form-layout>
          <cc-text-field label="Website" name="website" required></cc-text-field>
          <cc-text-field label="Position" name="position" required></cc-text-field>
          <cc-text-field label="Source" name="source"></cc-text-field>
          <cc-date-picker label="Date Applied" required name="date-applied"></cc-date-picker>
          <cc-select name="status" label="Status" colspan="2">
            <cc-option value="pending" aria-selected="true">Pending</cc-option>
            <cc-option value="rejected">Rejected</cc-option>
            <cc-option value="not-applied">Not Applied</cc-option>
          </cc-select>
          <cc-textarea label="Nodes" name="notes" colspan="2"></cc-textarea>
          <cc-button type="submit" theme="primary">Submit</cc-button>
        </cc-form-layout>
      </form>
    `;
  }

  /**
   * Add a new job into database.
   * @param {SubmitEvent} event
   */
  addJob(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formDataObject = {};
  
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    const submitButton = this.shadowRoot?.querySelector('[type="submit"]');
    submitButton?.setAttribute('loading', '');
  
    fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObject)
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

customElements.define('add-job', AddJob);