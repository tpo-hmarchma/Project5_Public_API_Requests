    //TODO:
    //Remove modal buttons for exceeds if I don't go for exceeds

/**
 * Request 12 random users from the API in a single request
 * Specified nationality in request in order to make formatting easier in later steps
 * New random employee information displays each time page refreshes
*/
//put in a function
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => generateDirectory(data.results))
  .catch(err => console.log('Error fetching employees:', err));

/**
 * Directory displays 12 random users with image, first name, last name, email, and location
*/

function generateDirectory (data) {
  let directory = data.map(employee =>
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
  document.querySelector('#gallery').insertAdjacentHTML('beforeend', directory);
}

/**
 * Modal window pops up when directory item is clicked
 * Modal window includes: image, name, email, location, cell number, detailed address, birthday
 * Moday window can be closed
 */

// function createModal creates a blank modal window with formatting
function createModal () {
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
  // blank modal window is added to the DOM and then hidden
  document.querySelector('body').insertAdjacentHTML('afterend', modalWindow);
  document.querySelector('.modal-container').style.display = 'none';
  // Event Listener added to close modal window when close button is clicked
  document.querySelector('#modal-close-btn').addEventListener('click', (e) => {
    document.querySelector('.modal-container').style.display = 'none';
  });
}

// Event Listener to open modal window when directory card is clicked
//AM currently trying to add listener before cards are created - FIX THIS
document.querySelectorAll('.card').addEventListener('click', (e) => {
  document.querySelector('.modal-container').style.display = 'block';
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
