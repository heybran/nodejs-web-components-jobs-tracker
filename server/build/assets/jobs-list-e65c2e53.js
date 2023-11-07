class s extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}async connectedCallback(){const e=await(await fetch("/api/jobs")).json();this.shadowRoot.innerHTML=`
      <style>
        table {
          width: 100%;
          text-align: left;
        }

        tr > td {
          border-top: 1px solid #e6e6e6;
          padding-block: 0.5rem;
        }

        tr > td:nth-child(6) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 10em;
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
          ${this.renderTable(e)}
        </tbody>
      </table>
    `}renderTable(d){let e="";return d.forEach(t=>{e+=`
        <tr data-job-id="${t.id}">
          <td>${t.website}</td>
          <td>${t.position}</td>
          <td>${t.source??""}</td>
          <td>${t.date_applied}</td>
          <td>${t.status}</td>
          <td>${t.notes??""}</td>
          <td>
            <cc-button theme="primary" href="/jobs/edit?id=${t.id}">Edit</cc-button>
            <cc-button theme="danger" href="/jobs/delete?id=${t.id}&website=${t.website}">Delete</cc-button>
          </td>
        </tr>
      `}),e}}customElements.define("jobs-list",s);export{s as default};
