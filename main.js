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

import "./src/controllers/job.js";

const outlet = document.querySelector('[router-outlet]');
const ROUTER = new CucumberRouter(outlet);
window.ROUTER = ROUTER;

ROUTER.start();