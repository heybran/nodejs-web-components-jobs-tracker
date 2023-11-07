import "./style.css";
import "./src/index.js";
import BreezeRouter from "breeze-router";
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

const ROUTER = new BreezeRouter();
window.ROUTER = ROUTER;

const main = document.querySelector('#main');

ROUTER.add('/', async ({ route, params }) => {
  await import("./src/routes/add-job.js").catch(console.error);
  main.innerHTML = `<add-job></add-job>`;
});

ROUTER.add('/jobs', async ({ route, params }) => {
  await import("./src/routes/jobs-list.js").catch(console.error);
  main.innerHTML = `<jobs-list></jobs-list>`;
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/getName
  // not supported yet
  // console.log(customElements.getName(signup));
});

ROUTER.add('/jobs/edit', async ({ route, params }) => {
  await import("./src/routes/edit-job.js").catch(console.error);
  const editJob = document.createElement('edit-job');
  main.appendChild(editJob);
});

ROUTER.add('/jobs/delete', async ({ route, params }) => {
  await import("./src/routes/delete-job.js").catch(console.error);
  const deleteJob = document.createElement('delete-job');
  main.appendChild(deleteJob);
});

ROUTER.add('404', () => {
  alert('page not found');
  ROUTER.redirect('/');
});

ROUTER.start();