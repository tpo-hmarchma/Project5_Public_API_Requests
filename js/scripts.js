/**
 * Request 12 random users from the API in a single request
 * Specified nationality in request in order to make formatting easier in later steps
 * New random employee information displays each time page refreshes
*/

fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => generateGallery(data.results))
  .catch(err => console.log('Error fetching employees:', err));

/**
 * Directory displays 12 random users with image, first name, last name, email, and location
*/
function generateGallery (data) {
  for (i=0; i < data.length; i++) {
    let employee = data[i];
    const galleryCard = `
    <div class="card">
     <div class="card-img-container">
     <img class="card-img" src=${employee.picture.thumbnail} alt="profile picture">
    </div>`;
    const galleryContainer = `
    <div class="card-info-container">
     <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
     <p class="card-text">${employee.email}</p>
     <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
    </div>`;
    document.querySelector('#gallery').insertAdjacentHTML('beforeend', galleryCard + galleryContainer);
  }
}
