export default class JobController {
  /**
   * Add a new job into database.
   * @param {SubmitEvent} event
   */
  add(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formDataObject = {};
  
    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    const submitButton = this.shadowRoot?.querySelector('[type="submit"]');
    submitButton?.setAttribute('loading', '');
  
    fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObject)
    })
    .then(res => {
      // Handle the response from the server
      if (res.ok) {
        ROUTER.redirect('/jobs');
      }
    })
    .catch(error => {
      // Handle any errors that occur during the request
    }).finally(() => {
      submitButton?.removeAttribute('loading');
    });
  }
}