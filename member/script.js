var searchInputSubmitEl = document.querySelector('#button');
var mainCardEl = document.querySelector(".mainCard");
var iframeMap = document.querySelector("#iframeMap");
var realEstateMemberData;
var memberDetails = [];
var realEstateMemberCities = ["Iowa", "Michigan", " Lincoln", " Nashville", "Northumberland", " Kentucky", "Arizona", "Hawaii", "Colorado", "Hampshire UK"];

document.querySelector("#format-input").addEventListener('change', onSelectMemeber);


function getMemberData() {
  var memberDetails = 'https://api.bridgedataoutput.com/api/v2/OData/test/Member?access_token=6baca547742c6f96a6ff71b138424f21';
  fetch(memberDetails)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      realEstateMemberData = data.value;
      buildMemberDropDown(realEstateMemberData);
      return;
    })
}

// creating the dropdown for displaying member names with license number as values
function buildMemberDropDown(realEstateMemberData) {
   var searchformEl = document.getElementById('format-input');
  var optEl = document.createElement('option');
  optEl.value = "0";
  optEl.innerHTML = "Select a member";
  searchformEl.append(optEl);
  for (let i = 0; i < 10; i++) {
    optEl = document.createElement('option');
    optEl.value = realEstateMemberData[i].MemberStateLicense;
    console.log(optEl.value);
    optEl.innerHTML = realEstateMemberData[i].MemberFullName;
    searchformEl.append(optEl);
  }

}

function displayMemberDetails(licenseNumber) {
  mainCardEl.innerHTML = null;
  mainCardEl.style.display = "none";
  for (let i = 0; i < 10; i++) {
    
    if (licenseNumber === realEstateMemberData[i].MemberStateLicense) {
      mainCardEl.style.display = "block";
      iframeMap.src = "https://maps.google.com/maps?width=520&;height=400&q=Space+Needle," + realEstateMemberCities[i] + "&output=embed";
      var memberCardEl = document.createElement("div");
      var memberDetails = document.createElement("div");
      var memberNameEl = document.createElement("h1");
      var jobTitleEl = document.createElement("p");
      var officeNameEl = document.createElement("p");
      var cityEl = document.createElement("p");
      var stateEl = document.createElement("p");
      var statusEl = document.createElement("p");
      var memberImg = document.createElement("img");      

      memberCardEl.classList.add("card");
      memberDetails.classList.add("memberDetails")
      memberImg.classList.add("memberImg")
      memberNameEl.classList.add("h1");
      jobTitleEl.classList.add("memberdata");
      officeNameEl.classList.add("memberdata");
      cityEl.classList.add("memberdata");
      stateEl.classList.add("memberdata");
      statusEl.classList.add("memberdata");
    
      memberImg.setAttribute("src", "./member/images/" + localStorage.getItem(licenseNumber));
      memberNameEl.textContent = "FullName: " + realEstateMemberData[i].MemberFullName;
      jobTitleEl.textContent = "JobTitle: " + realEstateMemberData[i].JobTitle;
      officeNameEl.textContent = "Office: " + realEstateMemberData[i].OfficeName;
      cityEl.textContent = "City: " + realEstateMemberData[i].MemberCity;
      stateEl.textContent = "State: " + realEstateMemberData[i].MemberStateOrProvince;
      console.log(realEstateMemberData[i].MemberStateOrProvince);
      statusEl.textContent = "Status: " + realEstateMemberData[i].MemberStatus;

      memberDetails.append(jobTitleEl, officeNameEl, cityEl, stateEl, statusEl, memberImg);
      memberCardEl.append(memberNameEl,memberDetails, memberImg)
      mainCardEl.append(memberCardEl);
      return;
    } else if ("0" == licenseNumber){
      mainCardEl.style.display = "block";
      displaydefaultImage();
      return;
    }
  }
}
function displaydefaultImage() {
   var memberCardEl = document.createElement("div");
  memberCardEl.classList.add("card");
  var memberImg = document.createElement("img");  
  memberImg.classList.add("defaultImg")
  memberImg.setAttribute("src", "./member/images/shutterstock_615138353.jpg");
  memberCardEl.append(memberImg);
  mainCardEl.append(memberCardEl);
 
}
function addMemberImageNameToLocalStorage() {
    localStorage.setItem('0013285317480','0013285317480.jpg');
    localStorage.setItem('1575576983808','1575576983808.jpg');
    localStorage.setItem('2076281181422','2076281181422.jpg');
    localStorage.setItem('2398326509801','2398326509801.jpg');
    localStorage.setItem('2758466192620','2758466192620.jpg');
    localStorage.setItem('4746491045842','4746491045842.jpg');
    localStorage.setItem('5330163492387','5330163492387.jpg');
    localStorage.setItem('8045134567816','8045134567816.jpg');
    localStorage.setItem('9290368553077','9290368553077.jpg');
    localStorage.setItem('9755831298164','9755831298164.jpg');
    
  }  



function onSelectMemeber(event) {
  var inputValueEl = event.target.value;
  displayMemberDetails(inputValueEl);

}


getMemberData();
displaydefaultImage();
addMemberImageNameToLocalStorage();