    //TODO:
    //Remove modal buttons for exceeds if I don't go for exceeds

// Global Variables
// modalWindow is a blank modal window
const modalWindow = `
   <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>    
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        </div>
   `;

// Initial load specifications
// Create blank modal window and then hide it at start up
document.querySelector('body').insertAdjacentHTML('afterend', modalWindow);
document.querySelector('.modal-container').style.display = 'none';

/**
 * Request 12 random users from the API in a single request
 * Specified nationality in request in order to make formatting easier in later steps
 * New random employee information displays each time page refreshes
*/
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => generateDirectory(data.results))
  .catch(err => console.log('Error fetching employees:', err));

/**
 * Directory displays 12 random users with image, first name, last name, email, and location
*/
function generateDirectory (data) {
// Can change this to map or forEach
  for (i=0; i < data.length; i++) {
    let employee = data[i];
    const directoryItem = `
    <div class="card">
     <div class="card-img-container">
     <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
    </div>
    <div class="card-info-container">
     <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
     <p class="card-text">${employee.email}</p>
     <p class="card-text cap">${employee.location.city}</p>
    </div>
    </div>`;
    document.querySelector('#gallery').insertAdjacentHTML('beforeend', directoryItem);
  }
}

/**
 * Modal window pops up when directory item is clicked
 * Modal window includes: image, name, email, location, cell number, detailed address, birthday
 * Moday window can be closed
 */

// Event Listener to open modal window when directory card is clicked
document.querySelectorAll('.card').addEventListener('click', (e) => {
  document.querySelector('.modal-container').style.display = 'block';
});

// Event Listener to close modal window when close button is clicked
document.querySelector('#modal-close-btn').addEventListener('click', (e) => {
  document.querySelector('.modal-container').style.display = 'none';
});

// function generateModalData to take employee data and add it to blank modal window
// maybe do this with e.target? would that work
function generateModalData (data) {
  const modalData = `
   <div class="modal-info-container">
    <img class="modal-img" src=${employee.picture.thumbnail} alt="profile picture">
    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
    <p class="modal-text">${employee.email}</p>
    <p class="modal-text cap">${employee.location.city}</p>
    <hr>
    <p class="modal-text">${employee.phone}</p>
    <p class="modal-text">${employee.location.street} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
    <p class="modal-text">Birthday: ${employee.dob}</p>
   </div>
  `;
}
