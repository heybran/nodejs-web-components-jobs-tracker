import "./style.css";
import "./src/components/header.js";
import "./src/components/footer.js";
import CucumberRouter from "../cucumber-router/src/index.js";
import "cucumber-components/src/components/side-nav/side-nav.js";
import "cucumber-components/src/components/side-nav-item/side-nav-item.js";
import "cucumber-components/src/components/icon/icon.js";
import "cucumber-components/src/components/form-layout/form-layout.js";
import "cucumber-components/src/components/text-field/text-field.js";
import "cucumber-components/src/components/date-picker/date-picker.js";
import "cucumber-components/src/components/option/option.js";
import "cucumber-components/src/components/select/select.js";
import "cucumber-components/src/components/textarea/textarea.js";
import "cucumber-components/src/components/checkbox/checkbox.js";
import "cucumber-components/src/components/dialog/dialog.js";
import "cucumber-components/src/components/button/button.js";
import "cucumber-components/src/components/spinner/spinner.js";
import "cucumber-components/src/components/password-field/password-field.js";

import "./src/controllers/job.js";

const outlet = document.querySelector('[router-outlet]');
const ROUTER = new CucumberRouter(outlet);
ROUTER.addProtectedRouteGuard(async () => {
  const res = await fetch('/api/get-session');
  const data = await res.json();
  return data.isLoggedin;
}, () => {
  const template = document.createElement('template');
  template.innerHTML = `
    <cc-dialog label="You need to signin">
      Click ok will redirect you to home page to signin.
      <cc-button 
        theme="primary" 
        onclick="this.parentElement.close();"
        href="/signin"
        slot="footer-actions-right"
        style="width: 5em;"
      >Ok</cc-button>
    </cc-dialog>
  `;
  const dialog = template.content.cloneNode(true);
  document.body.appendChild(dialog);
  document.body.lastElementChild.show();
});
window.ROUTER = ROUTER;

ROUTER.start();
