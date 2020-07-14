const formData = document.forms['patient-form'];
const firstName = formData.querySelector('#firstName');
const lastName = formData.querySelector('#lastName');
const email = formData.querySelector('#email');
const gender = formData.querySelector('#gender');
const visitedNigeria = formData.querySelector('#checkbox');

// DOM to Table Body - tbody
const patientInformation = document.querySelector('.patient-information');

// Add New Patient Information
const addPatient = (e) => {
  e.preventDefault();

  patientInformation.innerHTML += `<tr>
  <td>${firstName.value} ${lastName.value}</td>
  <td>${email.value}</td>
  <td>${gender.value}</td>
  <td><a href="#">${visitedNigeria.checked ? 'Yes' : 'No'}</a></td>
  <td><span class="btn btn-1 edit">Edit</span></td>
  <td><span class="btn btn-1 delete">Delete</span></td>
</tr>`;

  formData.reset();
};

// Edit Patient Information
const editPatientInformation = (e) => {
  if (e.target.classList.contains('edit')) {
    const patient = e.target.parentElement.parentElement;

    // Populate form Data with selected patient infromation
    firstName.value = patient.children[0].innerText.split(' ')[0];
    lastName.value = patient.children[0].innerText.split(' ')[1];
    email.value = patient.children[1].innerText;
    gender.value = patient.children[2].innerText;
    patient.children[3].innerText === 'Yes'
      ? (visitedNigeria.checked = true)
      : (visitedNigeria.checked = false);

    // Change form submit button value to Update
    const update = document.querySelector('input[type=submit]');
    update.value = 'Update';

    // Overwrite patient Information
    update.addEventListener('click', (e) => {
      e.preventDefault();

      patient.innerHTML = `<tr>
      <td>${firstName.value} ${lastName.value}</td>
      <td>${email.value}</td>
      <td>${gender.value}</td>
      <td><a href="#">${visitedNigeria.checked ? 'Yes' : 'No'}</a></td>
      <td><span class="btn btn-1 edit">Edit</span></td>
      <td><span class="btn btn-1 delete">Delete</span></td>
    </tr>`;

      formData.reset();
    });
  }
};

// Delete Patient
const deletePatient = (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
};

// Event Listeners
formData.addEventListener('submit', addPatient);
patientInformation.addEventListener('click', editPatientInformation);
patientInformation.addEventListener('click', deletePatient);
