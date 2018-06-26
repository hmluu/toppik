import 'bootswatch/dist/flatly/bootstrap.css';
import './styles.css';
const userAddressInput = document.querySelector('#location');
const userSearchInput = document.querySelector('#venue');
const form = document.querySelector('form');
const searchVenue = userSearchInput.value;
// window.addEventListener('load', event => {
//   event.preventDefault();
//   getAddress();
//   getVenue();
// })
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchAddress = userAddressInput.value;
  const geo_api = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchAddress}&key=AIzaSyDPHepsa6b3tEV-A2i_t15HJZIj1uurxbw`;
  console.log(geo_api);
  fetch(geo_api)
  .then(response => response.json())
  .then(result => {
  const location = result.results["0"].geometry.location; //an object of the location
  console.log(location);
  const userLng = location.lng; //grabbing location longitude from above object
  const userLat = location.lat; //grabbing location latitude from the above object
  const fourSquare_api = `https://api.foursquare.com/v2/venues/search?ll=${userLng},${userLat}&query=${searchVenue}&client_id=YB2E5I4F5H1INFQNGKCA0LFKQDAKR50JHF0TWXK2NTZTEVN2&client_secret=Q2OGF5LBUOSFI3EVMO2ZP5JTD1QWQB0WJUYRYKOQPVU0EDXN&v=20180626`;
  console.log(fourSquare_api);
    fetch(fourSquare_api)
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
  })
})

// function showVenues(location, searchVenue){
//
// }
// 


// function getAddress(searchAddress) {
//   const url =
//   fetch(url)
//     .then(response => response.json())
//     .then(address => {
//
//       getVenue();
//     })
// }
//
//
// function getVenue() {
//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//
//   })
// }



// const venue_URL = "https://api.foursquare.com/v2/venues/search?ll=40.7484,-73.9857&client_id=YB2E5I4F5H1INFQNGKCA0LFKQDAKR50JHF0TWXK2NTZTEVN2&client_secret=Q2OGF5LBUOSFI3EVMO2ZP5JTD1QWQB0WJUYRYKOQPVU0EDXN&v=20180323";
//
// const geo_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDPHepsa6b3tEV-A2i_t15HJZIj1uurxbw";
// const userAddressInput =
