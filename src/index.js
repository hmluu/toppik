import 'bootswatch/dist/flatly/bootstrap.css';
import './styles.css';
const userAddressInput = document.querySelector('#location');
const userSearchInput = document.querySelector('#venue');
const form = document.querySelector('form');
const optionsList = document.querySelector('#options-list');
let venuesArray = [];
let firstCLick = false;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchVenue = userSearchInput.value;
  const searchAddress = userAddressInput.value;
  const geo_api = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchAddress}&key=AIzaSyDPHepsa6b3tEV-A2i_t15HJZIj1uurxbw`;
  fetch(geo_api)
    .then(response => response.json())
    .then(result => {
      const location = result.results["0"].geometry.location; //an object of the location
      const userLng = location.lng; //grabbing location longitude from above object
      const userLat = location.lat; //grabbing location latitude from the above object
      const fourSquare_api = `https://api.foursquare.com/v2/venues/search?ll=${userLat},${userLng}&query=${searchVenue}&client_id=YB2E5I4F5H1INFQNGKCA0LFKQDAKR50JHF0TWXK2NTZTEVN2&client_secret=Q2OGF5LBUOSFI3EVMO2ZP5JTD1QWQB0WJUYRYKOQPVU0EDXN&v=20180626&radius=500`;
      fetch(fourSquare_api)
        .then(response => response.json())
        .then(result => {
          venuesArray = result.response.venues;
          console.log(venuesArray);
          venuesArray.forEach(venue => {
            const eachOption = document.createElement('li');
            console.log(eachOption)
            eachOption.innerText = venue.name;
            optionsList.appendChild(eachOption);
            eachOption.addEventListener('click', () => {
              showOption(venue);
            });
          })
        })
    })
})


const showOption = (venue) => {
  let optionsSelector = '#option1';
  if (firstCLick == false){
    firstCLick = true
  } else {
    optionsSelector = '#option2';
    firstCLick = false
  }
  console.log(optionsSelector);

  const photo_url = `https://api.foursquare.com/v2/venues/${venue.id}/photos?client_id=YB2E5I4F5H1INFQNGKCA0LFKQDAKR50JHF0TWXK2NTZTEVN2&client_secret=Q2OGF5LBUOSFI3EVMO2ZP5JTD1QWQB0WJUYRYKOQPVU0EDXN&v=20180626`;
  fetch(photo_url)
  .then(res => res.json())
  .then(result => {
    const photo_details = result.response.photos.items[0];
    const photo_url = `${photo_details.prefix}300x500${photo_details.suffix}`;
    console.log(result.response.photos.items[0]);
    const location = venue.location;

    document.querySelector(optionsSelector).innerHTML = `
    <h5>${venue.name}</h5>
    <div>${location.address}</div>
    <div>${location.cc}</div>
    <div>${location.city}</div>
    <div>${location.country}</div>
    <img src="${photo_url}">


    `
  })
}




// const venue_URL = "https://api.foursquare.com/v2/venues/search?ll=40.7484,-73.9857&client_id=YB2E5I4F5H1INFQNGKCA0LFKQDAKR50JHF0TWXK2NTZTEVN2&client_secret=Q2OGF5LBUOSFI3EVMO2ZP5JTD1QWQB0WJUYRYKOQPVU0EDXN&v=20180323";
// const geo_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDPHepsa6b3tEV-A2i_t15HJZIj1uurxbw";
