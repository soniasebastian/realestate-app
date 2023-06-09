

    //variables
    // let dateSearch = document.getElementById('date-search')
    // let dateSearchBtn = document.getElementById('date-search-btn')

    let infoCard = document.getElementById('info-card')

    // //event listener on date search button
    // dateSearchBtn.addEventListener('click',getDateInfo)
    
    // function getDateInfo(event){
    //     event.preventDefault();
    //     var selectedDate = dateSearch.value;
    //     fetchData(selectedDate, null);
    // };    
    
    let citySearch = document.getElementById('city-search')
    let citySearchBtn = document.getElementById('city-search-btn')
    //event listener on city search button
    citySearchBtn.addEventListener('click', getCityInfo)
    
    function getCityInfo(event){
        event.preventDefault();
        var selectedCity = citySearch.value;
        fetchData(selectedCity);
    };

    //API call Listing
    function fetchData(selectedCity){
        let openHouseQuery = 'https://api.bridgedataoutput.com/api/v2/test/openhouses?access_token=6baca547742c6f96a6ff71b138424f21';
        fetch(openHouseQuery)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            infoCard.innerHTML = '';
            
            const listingPromises = data.map(function(openHouse){
                const listingIDs = openHouse.bundle.map(function(item){
                    return item.listingID;
                });
            const listingPromises = listingIDs.map(function(listingID){
               let listingQuery = 'https://api.bridgedataoutput.com/api/v2/test/listings/' + listingID +'?access_token=6baca547742c6f96a6ff71b138424f21';
                fetch(listingQuery)
                .then(function(response){
                    return response.json()
                });
            });
            return Promise.all(listingPromises);
            });
            return Promise.all(listingPromises)
            })
            .then(function(listingsData){
                for (let i = 0; i < listingsData.length; i++) {
                    const listingsData = listingsData[i];
                    var address = document.createElement('p');
                    address.classList.add('details');
                    address.innerHTML = 'Address:' + listingsData[selectedCity].bundle.UnparsedAddress;
                    infoCard.appendChild(address);
                }
            })
        .catch(function(error){
            console.log('Error:', error);
        })
        .catch(function(error){
            console.log('Error:', error);
        })
            }

   
        



// function displayData(data){
    //    if(data && data.length >0){
    //     for (let index = 0; index < data.length; index++) {
    //         const listingInfo = data[index];
    //     document.getElementById('bathrooms').textContent = 'Number of Bathrooms:' +   listingInfo.BathroomsFull
    //     }
    // }else{
    //     console.log('no data available')
    // }
    // }

    // function displayData (data){
    //     var address = document.createElement('p');
    //     address.classList.add('details');
    //     address.innerHTML = 'Adress:' + String(data.bundle[i].UnparsedAddress)
    //     console.log(address)
    // }
    //API call Date




/*
Listing IDs
0: 5dba1ff74aa4055b9f2a4fdc
    OpenHouseDate: "2020-02-22"
    OpenHouseStartTime: "2020-02-22T22:24:22.943Z"
    OpenHouseEndTime: "2020-02-23T02:24:22.943Z"
    City: "Hirtheshire"
    StateOrProvince: "New York"
1: 5dba1fdd4aa4055b9f29f28e
    OpenHouseDate: "2020-08-20"
    OpenHouseStartTime: "2020-08-20T09:26:36.007Z"
    OpenHouseEndTime:  "2020-08-20T13:26:36.007Z"
    City: "Port Leilanichester"
    StateOrProvince: "Iowa"
2: "5dba1fc04aa4055b9f2982d5"
    OpenHouseDate: "2020-06-04"
    OpenHouseStartTime: 
    OpenHouseEndTime:  "2020-06-05T05:16:31.888Z"
    City: "Trinitymouth"
    StateOrProvince: "Utah"
3: "5dba1fe64aa4055b9f2a0e46"
    OpenHouseDate: "2020-09-01"
    OpenHouseStartTime: "2020-09-01T09:13:02.123Z"
    OpenHouseEndTime:  "2020-09-01T09:13:02.123Z"
    City: "Schultzshire"
    StateOrProvince: "North Carolina"
4: "5dba1ff44aa4055b9f2a454f"
    OpenHouseDate: "2020-10-24"
    OpenHouseStartTime: "2020-10-25T01:15:25.508Z"
    OpenHouseEndTime:  "2020-10-25T06:15:25.508Z"
    City: "South Lilianafort"
    StateOrProvince: "New Mexico"
5: "5dba1fee4aa4055b9f2a2ebb"
    OpenHouseDate: 2019-12-20"
    OpenHouseStartTime: 2019-12-20T08:14:04.901Z"
    OpenHouseEndTime:  "2019-12-20T13:14:04.901Z"
    City: "New Jofurt"
    StateOrProvince:"California"
6: "5dba20054aa4055b9f2a85cb"
    OpenHouseDate: "2020-01-19"
    OpenHouseStartTime: "2020-01-20T01:02:19.885Z"
    OpenHouseEndTime:  "2020-01-20T01:02:19.885Z"
    City: "Itzelbury"
    StateOrProvince: "Virginia"
7: "5dba1ffe4aa4055b9f2a6808"
    OpenHouseDate: "2020-05-08"
    OpenHouseStartTime: "2020-05-09T03:14:10.487Z"
    OpenHouseEndTime:  "2020-05-09T05:14:10.487Z"
    City: "Tressaland"
    StateOrProvince: "Connecticut"
8: "5dba20074aa4055b9f2a8e62"
    OpenHouseDate: "2019-12-30"
    OpenHouseStartTime: "2019-12-30T21:23:59.871Z"
    OpenHouseEndTime:  "2019-12-30T21:23:59.871Z"
    City: "New Granville"
    StateOrProvince: "Kentucky"
9: "5dba1ff64aa4055b9f2a4add"
    OpenHouseDate: "2020-05-07"
    OpenHouseStartTime: "2020-05-07T13:59:44.911Z"
    OpenHouseEndTime:  "2020-05-07T13:59:44.911Z"
    City: "Everetteberg"
    StateOrProvince: "Colorado"

*/
// let queryURL = "https://api.bridgedataoutput.com/api/v2/test/openhouses?access_token=6baca547742c6f96a6ff71b138424f21";
//        fetch(queryURL)
//        .then(res => res.json())
//         .then(data => console.log(data))


        // let queryURL2 = "https://api.bridgedataoutput.com/api/v2/test/listings/5dba1ff64aa4055b9f2a4add?access_token=6baca547742c6f96a6ff71b138424f21";
        // fetch(queryURL2)
        // .then(res => res.json())
        //  .then(data => console.log(data))
    
        //  let queryURL3 = "https://api.bridgedataoutput.com/api/v2/OData/test/Property('P_5dba1ff74aa4055b9f2a4fdb')?access_token=6baca547742c6f96a6ff71b138424f21";
        //  fetch(queryURL3)
        //  .then(res => res.json())
        //   .then(data => console.log(data))


        // var googleData = function () {
        //     var apiUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxsA1zeJaYUQMKQHp7PHtXk7YnHTJhMT4=initMap";
        //     document.querySelector(".google-maps").src = apiUrl;
        //     initMap();
        //   };
        //   function initMap() {
        //     const myLatLng = { lat: 43.7001, lng: -79.4163 };
        //     const map = new google.maps.Map(document.getElementById("map"), {
        //       zoom: 4,
        //       center: myLatLng,
        //     });
        //     new google.maps.Marker({
        //       position: myLatLng,
        //       map,
        //       title: "Hello World!",
        //     });
        //   }
        //   window.initMap = initMap;
     


// V2:
// let citySearch = document.getElementById('city-search');
// let citySearchBtn = document.getElementById('city-search-btn');
// let infoCard = document.getElementById('info-card');

// // event listener on city search button
// citySearchBtn.addEventListener('click', getCityInfo);

// function getCityInfo(event) {
//   event.preventDefault();
//   var selectedCity = citySearch.value;
//   fetchData(selectedCity);
// }

// // API call Listing
// function fetchData(selectedCity) {
//   let openHouseQuery = 'https://api.bridgedataoutput.com/api/v2/test/openhouses?access_token=6baca547742c6f96a6ff71b138424f21';
//   fetch(openHouseQuery)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       // Clear previous results
//       infoCard.innerHTML = '';

//       const listingPromises = data.map(function(openHouse) {
//         const listingIDs = openHouse.bundle.map(function(item) {
//           return item.ListingId;
//         });

//         const listingPromises = listingIDs.map(function(listingID) {
//           let listingQuery = 'https://api.bridgedataoutput.com/api/v2/test/listings/' + listingID + '?access_token=6baca547742c6f96a6ff71b138424f21';
//           return fetch(listingQuery)
//             .then(function(response) {
//               return response.json();
//             });
//         });

//         return Promise.all(listingPromises);
//       });

//       return Promise.all(listingPromises);
//     })
//     .then(function(listingsData) {
//       for (let i = 0; i < listingsData.length; i++) {
//         const listingData = listingsData[i];
//         var address = document.createElement('p');
//         address.classList.add('details');
//         address.innerHTML = 'Address: ' + listingData[selectedCity].bundle.UnparsedAddress;
//         infoCard.appendChild(address);
//       }
//     })
//     .catch(function(error) {
//       console.log('Error:', error);
//     });
// }