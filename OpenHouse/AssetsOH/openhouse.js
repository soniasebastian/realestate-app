let citySearch = document.getElementById('city-search');
let citySearchBtn = document.getElementById('city-search-btn');
let resultContainer = document.getElementById('result-container'); 
let submitBtn = document.getElementById('submit-btn');
let viewSubmissionBtn = document.getElementById('view-submission-btn');
let submissionCard = document.getElementById('submission-card');

let appnameEl = document.querySelector('.appname');
let applogoEl = document.querySelector('.applogo');
let menuEl = document.querySelector('.menu')


var indexPage=()=>{
  menuEl.setAttribute('href',document.location.replace('../index.html'))
}
appnameEl.addEventListener('click',indexPage)
applogoEl.addEventListener('click',indexPage)

var selectedCity = localStorage.getItem('selectedCity') || '';

// event listener on city search button
citySearchBtn.addEventListener('click', getCityInfo);

var selectedCity = citySearch.value;

function getCityInfo(event) {
  event.preventDefault();
  var selectedCity = citySearch.value;
  fetchData(selectedCity);
  localStorage.setItem('selectedCity', selectedCity);
}

// API call Listing
// API call Listing
function fetchData(selectedCity) {
    let openHouseQuery =
      'https://api.bridgedataoutput.com/api/v2/test/openhouses?access_token=6baca547742c6f96a6ff71b138424f21';
    fetch(openHouseQuery)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); // Check the structure of the data object
  
        resultContainer.innerHTML = ''; // Clear previous results
  
        data.bundle.forEach(function (openHouseArray) {
          let listingID = openHouseArray.ListingId;

        //   console.log(listingID);
          let listingQuery =
            'https://api.bridgedataoutput.com/api/v2/test/listings/' +
            listingID +
            '?access_token=6baca547742c6f96a6ff71b138424f21';
          fetch(listingQuery)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
                // console.log(data)
              if (data.success) {
                let listingData = data.bundle;
                let openHouseDate = openHouseArray.OpenHouseDate
                let openHouseEndTime = openHouseArray.OpenHouseEndTime;
                let openHouseStartTime = openHouseArray.OpenHouseStartTime;
                console.log(openHouseDate);
                // Filter listing data based on the selected city
                var selectedCity = citySearch.value;
                console.log(selectedCity, listingData);
                    console.log(listingData.City)
                  if (listingData.City === selectedCity) {
                    var selectedListing = listingData;
                    createListingCard(selectedListing, openHouseDate, openHouseEndTime, openHouseStartTime);
                
                  }
  
                
              }
            })
            .catch(function (error) {
              console.log('Error:', error);
            });
        });
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }
  

function createListingCard(listingData, openHouseDate, openHouseEndTime, openHouseStartTime) {
  // Create card container
  var card = document.createElement('div');
  card.classList.add('sm:bg-blue-500', 'md:bg-blue-400', 'lg:bg-blue-300', 'w-full', 'object-cover', 'flex', 'flex-col', 'justify-between', 'p-4', 'leading-normal');
  card.classList.add('card');
 console.log(listingData)

  // Create card content
  var address = document.createElement('p');
  address.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  address.innerHTML = 'Address: ' + listingData.UnparsedAddress;

  var date = document.createElement('p');
  date.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  date.innerHTML = 'Open House Date: ' + openHouseDate;

  var endTime = document.createElement('p');
  endTime.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  endTime.innerHTML = 'Open House End Time: ' + formatTime(openHouseEndTime);

  var startTime = document.createElement('p');
  startTime.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  startTime.innerHTML = 'Open House Start Time: ' + formatTime(openHouseStartTime);


  function formatTime(dateTimeString){
    var dateTime = new Date(dateTimeString);
    var hours = dateTime.getUTCHours();
    var minutes = dateTime.getUTCMinutes();
    var seconds = dateTime.getUTCSeconds();
    return hours + ':' + minutes
  }

  var listPrice = document.createElement('p');
  listPrice.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  listPrice.innerHTML = 'List Price: ' + formatCurrency(listingData.OriginalListPrice);

  function formatCurrency(amount){
  return Number(amount).toLocaleString('en-US',{style: 'currency',currency:'USD'})
  };

  var yearBuilt = document.createElement('p');
  yearBuilt.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  yearBuilt.innerHTML = 'Year Built: ' + listingData.YearBuilt;

  var lotSize = document.createElement('p');
  lotSize.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  lotSize.innerHTML = 'Lot Size: ' + listingData.LotSizeSquareFeet + ' sq ft';

  var bedrooms = document.createElement('p');
  bedrooms.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  bedrooms.innerHTML = 'Number of Bedrooms: ' + listingData.BedroomsPossible;

  var bathrooms = document.createElement('p');
  bathrooms.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  bathrooms.innerHTML = 'Number of Bathrooms: ' + listingData.BathroomsFull;

  var direction = document.createElement('p');
  direction.classList.add('mb-2', 'text-xl', 'tracking-tight', 'text-gray-900', 'dark:text-white')
  direction.innerHTML = 'Direction: ' + listingData.DirectionFaces;


  let imageArray = ['OpenHouse/AssetsOH/images/OH1.jpeg','OpenHouse/AssetsOH/images/OH2.jpeg','OpenHouse/AssetsOH/images/OH3.jpeg','OpenHouse/AssetsOH/images/OH4.jpeg','OpenHouse/AssetsOH/images/OH5.jpeg','OpenHouse/AssetsOH/images/OH6.jpeg','OpenHouse/AssetsOH/images/OH7.jpeg','OpenHouse/AssetsOH/images/OH8.jpeg','OpenHouse/AssetsOH/images/OH9.jpeg','OpenHouse/AssetsOH/images/OH10.jpeg']

  var randomImage = imageArray[Math.floor(Math.random()*imageArray.length)];

  var image = document.createElement('img');
  image.classList.add('w-full', 'object-cover', 'h-96', 'md:h-auto', 'md:w-full', 'rounded-t-lg')
  image.src = randomImage;
  image.classList.add('listing-image');

  // Append content to card
  card.appendChild(image);
  card.appendChild(address);
  card.appendChild(date);
  card.appendChild(startTime);
  card.appendChild(endTime);
  card.appendChild(listPrice);
  card.appendChild(yearBuilt);
  card.appendChild(lotSize);
  card.appendChild(bedrooms);
  card.appendChild(bathrooms);
  card.appendChild(direction);
  

  // Append card to result container
  resultContainer.appendChild(card);
}

submitBtn.addEventListener('click',function(event){
  event.preventDefault();
  let nameInput = document.getElementById('name');
  let phoneInput = document.getElementById('phone');
  let emailInput = document.getElementById('email');
  let methodInput = document.getElementById('method');
  let cityInput = document.getElementById('city');

  var name = nameInput.value;
  var phone = phoneInput.value;
  var email = emailInput.value;
  var method = methodInput.value;
  var city = cityInput.value;

  localStorage.setItem('name', name);
  localStorage.setItem('phone', phone);
  localStorage.setItem('email', email);
  localStorage.setItem('method', method);
  localStorage.setItem('city', city);

  nameInput.value = '';
  phoneInput.value = '';
  emailInput.value = '';
  methodInput.value = '';
  cityInput.value = '';

// Show the modal
var modal = document.getElementById('modal');
modal.classList.remove('hidden');

// Close the modal when "Close" button is clicked
var modalCloseBtn = document.getElementById('modal-close');
modalCloseBtn.addEventListener('click', function() {
  modal.classList.add('hidden');
});
});

viewSubmissionBtn.addEventListener('click',function(){
  var name = localStorage.getItem('name');
  var phone = localStorage.getItem('phone');
  var email = localStorage.getItem('email');
  var method = localStorage.getItem('method');
  var city = localStorage.getItem('city');

  if(name && phone && email && method && city){
    if(!submissionCard.classList.contains('submitted')){
    var cardContent = document.createElement('div');
    cardContent.innerHTML = `<h3>Your Submission Details:</h3> <p>Name: ${name}</p> <p>Phone: ${phone}</p> <p>Email: ${email}</p> <p>Method of Contact: ${method}</p> <p>City: ${city}</p>`;
    submissionCard.appendChild(cardContent);
    submissionCard.classList.add('submitted');
    }
  }else{
    submissionCard.innerHTML = 'No form submission found.';
  }
})

    


let queryURL = "https://api.bridgedataoutput.com/api/v2/test/openhouses?access_token=6baca547742c6f96a6ff71b138424f21";
       fetch(queryURL)
       .then(res => res.json())
        .then(data => console.log(data))


        let queryURL2 = "https://api.bridgedataoutput.com/api/v2/test/listings/5dba1ff74aa4055b9f2a4fdc?access_token=6baca547742c6f96a6ff71b138424f21";
        fetch(queryURL2)
        .then(res => res.json())
         .then(data => console.log(data))