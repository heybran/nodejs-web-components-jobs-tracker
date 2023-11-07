import "cucumber-components/src/components/button/button.js";

export default class JobsList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const res = await fetch('/api/jobs');
    const jobs = await res.json();
    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          text-align: left;
        }

        tr > td {
          border-top: 1px solid #e6e6e6;
          padding-block: 0.5rem;
        }

        tr > th {
          padding-block: 0.5rem;
        }
      </style>
      <table>
        <tr>
          <th>Website</th>
          <th>Position</th>
          <th>Source</th>
          <th>Date Applied</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
        <tbody>
          ${this.renderTable(jobs)}
        </tbody>
      </table>
    `;
  }

  renderTable(jobs) {
    let html = '';
    jobs.forEach(job => {
      html += `
        <tr data-job-id="${job.id}">
          <td>${job.website}</td>
          <td>${job.position}</td>
          <td>${job.source}</td>
          <td>${job.date_applied}</td>
          <td>${job.status}</td>
          <td>${job.notes}</td>
          <td>
            <cc-button theme="primary">Edit</cc-button>
            <cc-button theme="danger">Delete</cc-button>
          </td>
        </tr>
      `;
    });

    return html;
  }
}

customElements.define('jobs-list', JobsList);