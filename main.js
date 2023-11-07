import "./style.css";
import "./src/index.js";
import BreezeRouter from "breeze-router";

const ROUTER = new BreezeRouter();

const main = document.querySelector('#main');

ROUTER.add('/', async ({ route, params }) => {
  const { default: home } = await import("./src/routes/add-job.js").catch(console.error);
  main.innerHTML = `<add-job></add-job>`;
})

ROUTER.add('/signup', async ({ route, params }) => {
  const { default: signup } = await import("./src/routes/Signup.js").catch(console.error);
  console.dir(signup);
  main.innerHTML = `<cc-signup></cc-signup>`;
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/getName
  // not supported yet
  // console.log(customElements.getName(signup));
})

ROUTER.add('404', () => {
  alert('page not found');
  ROUTER.redirect('/');
})

ROUTER.start();