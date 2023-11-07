class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}async connectedCallback(){let t=new URLSearchParams(location.search),e=t.get("id"),o=t.get("website");this.shadowRoot.innerHTML=`
      <cc-dialog label="Are you sure you want to delete this job?">
        You are about to delete job of ${o}.
        <cc-button 
          theme="primary" 
          slot="footer-actions-right"
          onclick="this.getRootNode().host.deleteJob('${e}');"
        >Confirm</cc-button>
      </cc-dialog>
    `,this.shadowRoot.querySelector("cc-dialog").show()}deleteJob(t){var o;const e=(o=this.shadowRoot)==null?void 0:o.querySelector("cc-button");e==null||e.setAttribute("loading",""),fetch("/api/jobs/delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})}).then(c=>{c.ok&&ROUTER.redirect("/jobs")}).catch(c=>{}).finally(()=>{e==null||e.removeAttribute("loading")})}}customElements.define("delete-job",a);export{a as default};
