import "./style.css";
import "./src/index.js";
import BreezeRouter from "breeze-router";

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