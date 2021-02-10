/**
 * Request 12 random users from the API in a single request
 * Specified nationality in request in order to make formatting easier in later steps
 * New random employee information displays each time page refreshes
 * Directory displays 12 random users with image, first name, last name, email, and location
 */
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => console.log(data));
