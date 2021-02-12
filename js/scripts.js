    //TODO:
    //Remove modal buttons for exceeds if I don't go for exceeds

/**
 * Request 12 random users from the API in a single request
 * Specified nationality in request in order to make formatting easier in later steps
 * New random employee information displays each time page refreshes
*/

// Global variables

// Variable for address of API with specific results requested
const randomUsersUrl = 'https://randomuser.me/api/?nat=us&results=12';

async function getRandomEmployees (url) {
  const getRandomEmployeesResponse = await fetch(url);
  const getRandomEmployeesJSON = await getRandomEmployeesResponse.json();
  return getRandomEmployeesJSON;
}

getRandomEmployees(randomUsersUrl)
  .then(data => generateDirectory(data.results))
  .then(() => generateModalCards())
  .catch(err => console.log('Error fetching employees:', err));

/**
 * Directory displays 12 random users with image, first name, last name, email, and location
*/
// generateDirectory maps over the returned employee data and creates directory cards for each employee
function generateDirectory (data) {
  let directory = data.map((employee, index) =>
    `<div class="card">
      <div class="card-img-container">
      <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
     </div>
     <div class="card-info-container">
      <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
      <p class="card-text">${employee.email}</p>
      <p class="card-text cap">${employee.location.city}</p>
     </div>
     </div>
    `).join('');
  // directory is added to the DOM
  document.querySelector('#gallery').insertAdjacentHTML('beforeend', directory);
  // Call the createModal function to create the blank hidden modal window
  createModal();
}

/**
 * Modal window pops up when directory item is clicked
 * Modal window includes: image, name, email, location, cell number, detailed address, birthday
 * Moday window can be closed
 */

// createModal creates a blank modal window with formatting
function createModal () {
  const modalWindow = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
      </div>
  </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        </div>
   `;
  // blank modal window is added to the DOM and then hidden
  document.querySelector('body').insertAdjacentHTML('afterend', modalWindow);
  document.querySelector('.modal-container').style.display = 'none';
  // Event Listener added to close modal window when close button is clicked
  document.querySelector('#modal-close-btn').addEventListener('click', (e) => {
    document.querySelector('.modal-container').style.display = 'none';
  });
}

// generateModalCards targets all cards and adds an event listener to open modal windo when card is clicked
function generateModalCards () {
  const directoryCards = document.querySelectorAll('.card');
  directoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      document.querySelector('.modal-container').style.display = 'block';
      // let person = e.currentTarget.index;
      console.log(e.target.index);
      // console.log(person);
    });
  });
}

// let person = e.Target, and then get the card-text (which is the email), and use that to get the info?
// maybe go back and put all info in an array?


// function setModalData to take employee data and add it to blank modal window
function setModalContent (employee, data, index) {
  const modalInfoContainer = document.querySelector('.modal-info-container');
  modalInfoContainer.innerHTML = '';
  let modalCardInfo = 
    `
    <img class="modal-img" src=${employee.picture.large} alt="profile picture">
    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.phone}</p>
    <p class="modal-text">${employee.location.street} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
    <p class="modal-text">Birthday: ${employee.dob.date}</p>
  `;
  modalInfoContainer.insertAdjacentHTML('afterbegin', modalCardInfo);
}
