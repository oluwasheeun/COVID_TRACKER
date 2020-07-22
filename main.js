const formData = document.forms['patient-form'];
let firstName = formData.querySelector('#firstName');
let lastName = formData.querySelector('#lastName');
let email = formData.querySelector('#email');
let gender = formData.querySelector('#gender');
let visitedNigeria = formData.querySelector('#checkbox');

// DOM to Table Body - tbody
const patientInformation = document.querySelector('.patient-information');

// Add New Patient Information
const addPatient = (e) => {
  e.preventDefault();

  if (
    firstName.value.trim() === '' ||
    lastName.value.trim() === '' ||
    email.value.trim() === '' ||
    gender.value === ''
  ) {
    showAlert('Invalid Input', 'alert');
  } else {
    patientInformation.innerHTML += `<tr>
    <td>${firstName.value} ${lastName.value}</td>
    <td>${email.value}</td>
    <td>${gender.value}</td>
    <td><a href="#">${visitedNigeria.checked ? 'Yes' : 'No'}</a></td>
    <td><span class="btn btn-1 edit">Edit</span></td>
    <td><span class="btn btn-1 delete">Delete</span></td></tr>`;

    formData.reset();
    showAlert('Successful', 'alert alert-success');
  }
};

let patient;

// Edit Patient Information
const editPatientInformation = (e) => {
  if (e.target.classList.contains('edit')) {
    // Locate Patient info
    patient = e.target.parentElement.parentElement;

    // Populate form Data UI with selected patient infromation
    firstName.value = patient.children[0].innerText.split(' ')[0];
    lastName.value = patient.children[0].innerText.split(' ')[1];
    email.value = patient.children[1].innerText;
    gender.value = patient.children[2].innerText;
    patient.children[3].innerText === 'Yes'
      ? (visitedNigeria.checked = true)
      : (visitedNigeria.checked = false);

    // Show Update Button
    document.querySelector('input[type=submit]').style.display = 'none';
    const update = formData.querySelector('.update-data');
    update.style.display = 'inline-block';

    // Overwrite patient Information
    update.addEventListener('click', (e) => {
      e.preventDefault();

      if (
        firstName.value.trim() === '' ||
        lastName.value.trim() === '' ||
        email.value.trim() === '' ||
        gender.value === ''
      ) {
        showAlert('Invalid Input', 'alert');
        return;
      }

      patient.innerHTML = `<tr>
        <td>${firstName.value} ${lastName.value}</td>
        <td>${email.value}</td>
        <td>${gender.value}</td>
        <td><a href="#">${visitedNigeria.checked ? 'Yes' : 'No'}</a></td>
        <td><span class="btn btn-1 edit">Edit</span></td>
        <td><span class="btn btn-1 delete">Delete</span></td></tr>`;

      showAlert('Update Successful', 'alert alert-success');
    });
  }
};

// Delete Patient
const deletePatient = (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
};

// Error Message
const showAlert = (msg, className) => {
  //clear any remaining alerts
  clearAlert();

  //Create div
  const div = document.createElement('div');
  //Add classes
  div.className = className;
  //Add text
  div.appendChild(document.createTextNode(msg));
  //Get parent
  const container = document.querySelector('.patient_Details');
  //Get form box
  const form = document.querySelector('#patient-form');
  //Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(() => {
    clearAlert();
  }, 3000);
};

// Clear alert message
const clearAlert = () => {
  const currentAlert = document.querySelector('.patient_Details .alert');

  if (currentAlert) {
    currentAlert.remove();
  }
};

// Clear Fields
const clearFields = formData.querySelector('.clear-Fields');
clearFields.addEventListener('click', (e) => {
  e.preventDefault();

  formData.reset();
  document.querySelector('input[type=submit]').style.display = 'inline-block';
  formData.querySelector('.update-data').style.display = 'none';
});

// Event Listeners
formData.addEventListener('submit', addPatient);
patientInformation.addEventListener('click', editPatientInformation);
patientInformation.addEventListener('click', deletePatient);
