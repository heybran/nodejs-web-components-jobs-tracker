class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}async connectedCallback(){let t=new URLSearchParams(location.search).get("id"),e=await(await fetch(`/api/jobs/${t}`)).json();this.shadowRoot.innerHTML=`
      <style>
      </style>
      <cc-dialog>
        <form method="post" onsubmit="this.getRootNode().host.EditJob(event);" id="edit-job-form">
          <cc-form-layout>
            <cc-text-field label="Website" name="website" required value="${e.website}"></cc-text-field>
            <cc-text-field label="Position" name="position" required value="${e.position}"></cc-text-field>
            <cc-text-field label="Source" name="source" value="${e.source??""}"></cc-text-field>
            <cc-date-picker label="Date Applied" required name="date-applied" value="${e.date_applied}"></cc-date-picker>
            <cc-select name="status" label="Status" colspan="2">
              <cc-option value="pending" aria-selected="${e.status==="pending"?"true":""}">Pending</cc-option>
              <cc-option value="rejected" aria-selected="${e.status==="rejected"?"true":""}">Rejected</cc-option>
              <cc-option value="not-applied" aria-selected="${e.status==="not-applied"?"true":""}">Not Applied</cc-option>
            </cc-select>
            <cc-textarea label="Nodes" name="notes" colspan="2"></cc-textarea>
          </cc-form-layout>
        </form>
        <cc-button theme="primary" slot="footer-actions-right"
          onclick="this.getRootNode().host.updateJob('${t}', this)"
        >Submit</cc-button>
      </cc-dialog>
    `,this.shadowRoot.querySelector("cc-textarea").value=e.notes??"",this.shadowRoot.querySelector("cc-dialog").show()}updateJob(a,t){var o,e,c,i,s,l;t==null||t.setAttribute("loading",""),fetch(`/api/jobs/update/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({website:(o=this.shadowRoot)==null?void 0:o.querySelector('[name="website"]').value,position:(e=this.shadowRoot)==null?void 0:e.querySelector('[name="position"]').value,source:(c=this.shadowRoot)==null?void 0:c.querySelector('[name="source"]').value,date_applied:(i=this.shadowRoot)==null?void 0:i.querySelector('[name="date-applied"]').value,status:(s=this.shadowRoot)==null?void 0:s.querySelector('[name="status"]').value,notes:(l=this.shadowRoot)==null?void 0:l.querySelector('[name="notes"]').value})}).then(r=>{r.ok&&ROUTER.redirect("/jobs")}).catch(r=>{}).finally(()=>{t==null||t.removeAttribute("loading")})}}customElements.define("edit-job",d);export{d as default};
