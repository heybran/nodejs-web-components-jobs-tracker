class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML=`
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
    `}addJob(o){var a;o.preventDefault();const i=o.target,l=new FormData(i),c={};for(let[t,n]of l.entries())c[t]=n;const e=(a=this.shadowRoot)==null?void 0:a.querySelector('[type="submit"]');e==null||e.setAttribute("loading",""),fetch("/api/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}).then(t=>{t.ok&&ROUTER.redirect("/jobs")}).catch(t=>{}).finally(()=>{e==null||e.removeAttribute("loading")})}}customElements.define("add-job",d);export{d as default};