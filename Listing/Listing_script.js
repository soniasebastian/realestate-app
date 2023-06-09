var appnameEl = document.querySelector(".appname");
var applogoEl = document.querySelector(".applogo");
var menuEl = document.querySelector(".menu");
var menulistingsEl = document.querySelector(".menu-listings");
var selectCitydropdownEl1 = document.querySelector(".select-dd");
var selectMlsStatusdropdownEl1 = document.querySelector(".select-mls");
var listMainEl = document.querySelector(".list-main");
var listCardElement = document.querySelectorAll(".list-card");
var exploreBtnEl = document.querySelectorAll(".list-explore-btn");
var imgEl = document.querySelectorAll('.list-img')
var modalMainEl = document.querySelector("#myModal");
var modalContentEl = document.querySelector(".modal-content");
var modalCloseBtnEl = document.querySelector(".closebtn");
var heartOpenEl = document.querySelector(".fa-heart-o");
var heartFilledEl = document.querySelector(".fa-heart");
var favouritesEl = document.querySelector(".favourites");
var pageBtn1El =document.querySelector('.page1')
var pageBtn2El =document.querySelector('.page2')




var city = "";
var cityValue = "";
var Apidata = [];
var pageData=[]
var openHeartListEl = document.createElement("div");
var FilteredByCity_listId = [];
var FilteredByCity_MlsStatus=[]
var Selected_ListId =''
const itemsPerPage =5
var pageNumber=1
var pagination=false
var startIndex =0
var endIndex =0


var listingLSdata = JSON.parse(localStorage.getItem("ListingLS")) || {};
modalMainEl.style.dispaly = "none";

function changePage(page){
  pageNumber=page
}


var listingurl = document.location.href


var indexPage=(event)=>{
  menuEl.setAttribute('href',document.location.replace('../index.html'))
}
appnameEl.addEventListener('click',indexPage)
applogoEl.addEventListener('click',indexPage)


function listingsPage(){
  menuEl.setAttribute('href',listingurl)
}
menulistingsEl.addEventListener('click',listingsPage)


//get city name from drop down filter
function FilterByCity() {
  selectMlsStatusdropdownEl1.value="0"
  FilteredByCity_listId = [];
  city =
    selectCitydropdownEl1.options[selectCitydropdownEl1.selectedIndex].text;
  cityValue = selectCitydropdownEl1.value;

  if (city) {
    Apidata.bundle &&
      Apidata.bundle.filter((i) => {

        if (i.City === city) {
          FilteredByCity_listId.push(i);
          listMainEl.innerHTML=''
          listAll(FilteredByCity_listId,pagination);
        }
      });
  }
}






//get MLS Status from drop down filter
function FilterByMlsStatus() {
  selectCitydropdownEl1.value="0"
  // location.reload();
  FilteredByCity_MlsStatus = [];

  MLS_status =
    selectMlsStatusdropdownEl1.options[selectMlsStatusdropdownEl1.selectedIndex]
      .text;
  MLS_status_optionVal = selectMlsStatusdropdownEl1.value;

  if (MLS_status) {
    Apidata.bundle &&
      Apidata.bundle.filter((i) => {
        if (i.MlsStatus === MLS_status) {
          FilteredByCity_MlsStatus.push(i);
          listMainEl.innerHTML=''
          listAll(FilteredByCity_MlsStatus,pagination);
        }
      });
  }
}








var getApiData = (value) => {
  if (!value) {
    var requestUrl =
      "https://api.bridgedataoutput.com/api/v2/test/listings?access_token=6baca547742c6f96a6ff71b138424f21";
  } else {
    var requestUrl =
      "https://api.bridgedataoutput.com/api/v2/test/listings/" +
      value +
      "?access_token=6baca547742c6f96a6ff71b138424f21";
  }
  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
        Apidata = data;
        listMainEl.innerHTML=''
        listAll(data,pagination);
        });
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};
getApiData();








function listAll(data,pagination) {
  var apidatabundle = data.bundle



if(pagination == false){
if(data.status === 200){
  apidatabundle = data.bundle
  pageCard(apidatabundle)
}else if (typeof data == 'object'){
    apidatabundle = data
    pageCard(apidatabundle)
    }
  }



[pageBtn1El,pageBtn2El].forEach((ele)=>{
  ele.addEventListener('click',(event)=>{
        listMainEl.innerHTML=''
         startIndex = ((event.target.textContent)-1) * itemsPerPage
         endIndex=startIndex + itemsPerPage
        pageData = apidatabundle.slice(startIndex,endIndex)
        pageCard(pageData)
  })
})
}






function pageCard(apidatabundle){
  
  if(Object.values(apidatabundle).length === 1){
    document.querySelector(".pagination-main").style.display='none'
  }
  else{
    document.querySelector(".pagination-main").style.display='flex'
  }

  Object.values(apidatabundle).map((i)=>{
    //list-card (overall)
    var listCardEl = document.createElement("div");
    listCardEl.classList = "list-card center";
    listCardEl.addEventListener('click',(event)=>popUpListing(i,event))
    listMainEl.appendChild(listCardEl);


    //save to favourites
    var openHeartListEl = document.createElement("div");
    openHeartListEl.classList="list-heart"
    openHeartListEl.innerHTML =
      '<i class="fa fa-heart-o" style="font-size:24px;"></i>';
    // var HeartData=i
    if(listingLSdata[i.ListingId]){
      openHeartListEl.innerHTML =
      '<i class="fa fa-heart" style="font-size:24px;"></i>';
    }
    openHeartListEl.addEventListener('click',(event)=>heartLocalStorage(i,event))
    listCardEl.appendChild(openHeartListEl);



    // -----------------------------------
    //address line1 main (Unit num, streetname)
    var addressMain1El = document.createElement("div");
    addressMain1El.classList = "list-add-main1 center";

    // //list-img
    var listImgEl = document.createElement("img");
    listImgEl.src = imagedata[i.ListingId][0];
    listImgEl.alt = "image";
    listImgEl.classList = "list-img center";
    listCardEl.appendChild(listImgEl);
    

    //address icon
    var addressiconEl = document.createElement("span");
    addressiconEl.classList = "list-address-icon";
    // addressiconEl.innerHTML = '<i class="fa-solid fa-location-dot"></i>'
    addressiconEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>' +
      " ";
    addressMain1El.appendChild(addressiconEl);

    //list-UnitNumber
    var listUnitNumEl = document.createElement("span");
    listUnitNumEl.classList = "list-unitnum center";
    listUnitNumEl.textContent = " " + i.UnitNumber + " , ";
    addressMain1El.appendChild(listUnitNumEl);

    //list-StreetName
    var listStreetNameEl = document.createElement("span");
    listStreetNameEl.classList = "list-streetname center";
    listStreetNameEl.textContent = " " + i.StreetName;
    addressMain1El.appendChild(listStreetNameEl);

    listCardEl.appendChild(addressMain1El);

    var addressMain2El = document.createElement("div");
    addressMain2El.classList = "list-add-main2 center";

    //country icon
    var coutryiconEl = document.createElement("span");
    coutryiconEl.classList = "list-country-icon";
    coutryiconEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>';
    addressMain2El.appendChild(coutryiconEl);

    //list-city
    var listCityEl = document.createElement("span");
    listCityEl.classList = "list-city center";
    listCityEl.textContent = " " + i.City + " , ";
    addressMain2El.appendChild(listCityEl);

    // //list-country
    var listCountryEl = document.createElement("span");
    listCountryEl.classList = "list-country center";
    listCountryEl.textContent = " " + i.Country + " ";
    addressMain2El.appendChild(listCountryEl);

    listCardEl.appendChild(addressMain2El);


    // //list-Bed
    var BedBathParkMainEl = document.createElement("div");
    BedBathParkMainEl.classList = "list-BedBathPark-main center";
    var BedLabelEl = document.createElement("span");
    BedLabelEl.classList = "list-bed-label";
    BedLabelEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>' +
      " : ";
    var listBedEl = document.createElement("div");
    listBedEl.classList = "list-bed center";
    listBedEl.textContent = i.BedroomsTotal;
    BedBathParkMainEl.appendChild(BedLabelEl);
    BedBathParkMainEl.appendChild(listBedEl);
    listCardEl.appendChild(BedBathParkMainEl)

    var BathLabelEl = document.createElement("span");
    BathLabelEl.classList = "list-bath-label";
    BathLabelEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>' +
      " : ";
    var listBathEl = document.createElement("div");
    listBathEl.classList = "list-bath center";
    listBathEl.textContent = i.BathroomsFull;
    BedBathParkMainEl.appendChild(BathLabelEl);
    BedBathParkMainEl.appendChild(listBathEl);

    var parkingLabelEl = document.createElement("span");
    parkingLabelEl.classList = "list-parking-label";
    parkingLabelEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>' +
      " : ";
    var listParkingEl = document.createElement("div");
    listParkingEl.classList = "list-parking center";
    listParkingEl.textContent = i.GarageSpaces;
    BedBathParkMainEl.appendChild(parkingLabelEl);
    BedBathParkMainEl.appendChild(listParkingEl);
    listCardEl.appendChild(BedBathParkMainEl);

    // //list-price
    var listPriceMainEl = document.createElement("div");
    listPriceMainEl.classList = "list-price-main center";
    var listPriceTriangleEl = document.createElement("div");
    listPriceTriangleEl.classList = "list-triangle";
    var listpriceEl = document.createElement("div");
    listpriceEl.classList = "list-price";
    listpriceEl.textContent =
      "$ " + i.OriginalListPrice.toLocaleString();
    listPriceMainEl.appendChild(listPriceTriangleEl);
    listPriceMainEl.appendChild(listpriceEl);
    listCardEl.appendChild(listPriceMainEl);


    //list-YearBuilt
    var yearBuiltMainEl = document.createElement("div");
    yearBuiltMainEl.classList = "list-yearBuilt-main center";
    var yearBuiltLabelEl = document.createElement("span");
    yearBuiltLabelEl.classList = "list-yearBuilt-label";
    yearBuiltLabelEl.textContent = "Year Built : ";
    var listyearBuiltEl = document.createElement("div");
    listyearBuiltEl.classList = "list-yearBuilt center";
    listyearBuiltEl.textContent = i.YearBuilt;
    yearBuiltMainEl.appendChild(yearBuiltLabelEl);
    yearBuiltMainEl.appendChild(listyearBuiltEl);
    listCardEl.appendChild(yearBuiltMainEl);

    
    // //list-mlsStatus
    var MlsStatusMainEl = document.createElement("div");
    MlsStatusMainEl.classList = "list-mlsStatus-main center";
    var listMlsStatusLabelEl = document.createElement("span");
    listMlsStatusLabelEl.classList = "list-agent-label";
    listMlsStatusLabelEl.textContent = "MLS Status : ";
    var listmlsStatusEl = document.createElement("div");
    listmlsStatusEl.classList = "list-mlsStatus center";
    listmlsStatusEl.textContent = i.MlsStatus;
    MlsStatusMainEl.appendChild(listMlsStatusLabelEl);
    MlsStatusMainEl.appendChild(listmlsStatusEl);
    listCardEl.appendChild(MlsStatusMainEl);


    // //listid
  //   var ListIDListEl = document.createElement("div");
  //   ListIDListEl.classList = "list-listId";
  //   // // ListIDListEl.setAttribute('style','opacity:0.0;')
  //   ListIDListEl.textContent = "|" + i.ListingId;
  //   listCardEl.appendChild(ListIDListEl);

    listMainEl.appendChild(listCardEl); 
  })

}




function heartLocalStorage(i,event) {
  listingLSdata[i.ListingId]={
      ListingId:i.ListingId,
      City:i.City,
      Country:i.Country,
      Unit:i.UnitNumber,
      StreetName:i.StreetName,
      OriginalListPrice:i.OriginalListPrice,
      MlsStatus:i.MlsStatus,
      BedroomsTotal:i.BedroomsTotal,
      BathroomsFull:i.BathroomsFull,
      GarageSpaces:i.GarageSpaces,
      YearBuilt:i.YearBuilt
  }
  var heartListnerEl = event.target.classList[1];
      if (heartListnerEl.trim() == "fa-heart-o") {
        event.target.classList.remove('fa-heart-o')
        event.target.classList.add('fa-heart')
      }
        else if (heartListnerEl.trim() == "fa-heart"){
          event.target.classList.remove('fa-heart')
          event.target.classList.add('fa-heart-o')
          delete listingLSdata[i.ListingId]
        }  
        localStorage.setItem("ListingLS", JSON.stringify(listingLSdata));
      
}




 function popUpListing(i,event) {

  // Selected_ListId = (event.target.textContent).split('|')[1]
  if(event.target.classList[0] == "fa"){
    return
  }
    modalMainEl.style.display = "flex";
    var image = 0
    

    document.querySelector(".modal-image-left").addEventListener('click', ()=>{
      if(image-1 < 0){
        image=0
      }
      else{
        image-=1
      }
      document.querySelector(".modal-image").src=imagedata[i.ListingId][image]
    })

    document.querySelector(".modal-image").src=imagedata[i.ListingId][image]
    document.querySelector(".modal-image-right").addEventListener('click', ()=>{
      if(image+1 > 2){
        image=2
      }
      else{
        image+=1
      }
      document.querySelector(".modal-image").src=imagedata[i.ListingId][image]
    })

    document.querySelector(".modal-list-id").textContent = i.ListingId;
    document.querySelector(".modal-list-mlsStatus").textContent =
    i.MlsStatus;
    document.querySelector(".modal-list-price").textContent =
    "$ " + i.OriginalListPrice.toLocaleString();;
    document.querySelector(".modal-list-PropertyType").textContent =
    i.PropertyType;
    document.querySelector(".modal-list-YearBuilt").textContent =
    i.YearBuilt;
    document.querySelector(".modal-list-Bedrooms").textContent =
    i.BedroomsTotal;
    document.querySelector(".modal-list-LotSizeDimensions").textContent =
    i.LotSizeDimensions;
    document.querySelector(".modal-list-PropertyType").textContent =
    i.PropertyType;
    // document.querySelector(".modal-list-YearBuilt").textContent =
    // i.YearBuilt;
    // document.querySelector(".modal-list-BedroomsTotal").textContent =
    // i.BedroomsTotal;
    document.querySelector(".modal-list-ListAgentName").textContent =
    i.ListAgentFullName;

   var apiUrl =
  "https://www.google.com/maps/embed/v1/place?key=AIzaSyCy8PFgy7uGcwPxftTH3mYHuGuUDjb_gnM&q="+i.City

  document.querySelector(".google-maps").src = apiUrl;

  
  
  return Selected_ListId
}
   





function closePopUp(event) {
  if (event.target.innerHTML == "×") {
    modalMainEl.style.display = "none";
  }
}
modalCloseBtnEl.addEventListener("click",closePopUp);




function favouritesLS(){
  selectCitydropdownEl1.value="0"
  selectMlsStatusdropdownEl1.value='0'
    listMainEl.innerHTML=''
    listAll(listingLSdata,pagination)
}
favouritesEl.addEventListener('click',favouritesLS)


function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function initMap() {
  const myLatLng = { lat: 43.7001, lng: -79.4163 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}

window.initMap = initMap;

var getGoogleApiData = function (i) {
  var apiUrl =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyCy8PFgy7uGcwPxftTH3mYHuGuUDjb_gnM&q=" +
    i.City;

  document.querySelector(".google-maps").src = apiUrl;

  initMap();
};





