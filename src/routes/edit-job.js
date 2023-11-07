import "cucumber-components/src/components/form-layout/form-layout.js";
import "cucumber-components/src/components/text-field/text-field.js";
import "cucumber-components/src/components/date-picker/date-picker.js";
import "cucumber-components/src/components/option/option.js";
import "cucumber-components/src/components/select/select.js";
import "cucumber-components/src/components/textarea/textarea.js";
import "cucumber-components/src/components/checkbox/checkbox.js";
import "cucumber-components/src/components/button/button.js";
import "cucumber-components/src/components/dialog/dialog.js";

export default class EditJob extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    let search = new URLSearchParams(location.search);
    let id = search.get("id");
    let res = await fetch(`/api/jobs/${id}`);
    let job = await res.json();
    this.shadowRoot.innerHTML = `
      <style>
      </style>
      <cc-dialog>
        <form method="post" onsubmit="this.getRootNode().host.EditJob(event);" id="edit-job-form">
          <cc-form-layout>
            <cc-text-field label="Website" name="website" required value="${job.website}"></cc-text-field>
            <cc-text-field label="Position" name="position" required value="${job.position}"></cc-text-field>
            <cc-text-field label="Source" name="source" value="${job.source ?? ''}"></cc-text-field>
            <cc-date-picker label="Date Applied" required name="date-applied" value="${job['date_applied']}"></cc-date-picker>
            <cc-select name="status" label="Status" colspan="2">
              <cc-option value="pending" aria-selected="${job.status === 'pending' ? 'true' : ''}">Pending</cc-option>
              <cc-option value="rejected" aria-selected="${job.status === 'rejected' ? 'true' : ''}">Rejected</cc-option>
              <cc-option value="not-applied" aria-selected="${job.status === 'not-applied' ? 'true' : ''}">Not Applied</cc-option>
            </cc-select>
            <cc-textarea label="Nodes" name="notes" colspan="2"></cc-textarea>
          </cc-form-layout>
        </form>
        <cc-button theme="primary" slot="footer-actions-right"
          onclick="this.getRootNode().host.updateJob('${id}', this)"
        >Submit</cc-button>
      </cc-dialog>
    `;
    this.shadowRoot.querySelector('cc-textarea').value = job.notes ?? '';
    this.shadowRoot.querySelector('cc-dialog').show();
  }

  /**
   * @param {string} id
   * @param {HTMLElement} submitButton
   */
  updateJob(id, submitButton) {
    submitButton?.setAttribute('loading', '');
  
    fetch(`/api/jobs/update/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        website: this.shadowRoot?.querySelector('[name="website"]').value,
        position: this.shadowRoot?.querySelector('[name="position"]').value,
        source: this.shadowRoot?.querySelector('[name="source"]').value,
        date_applied: this.shadowRoot?.querySelector('[name="date-applied"]').value,
        status: this.shadowRoot?.querySelector('[name="status"]').value,
        notes: this.shadowRoot?.querySelector('[name="notes"]').value,
      })
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

customElements.define('edit-job', EditJob);