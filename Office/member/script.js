var searchInputSubmitEl = document.querySelector('#button');
var mainCardEl = document.querySelector(".mainCard");
var realEstateMemberData;

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
      chooseMemberDetails(realEstateMemberData);
      // displayMemberDetails(realEstateMemberData);
      return;
    })
};

function chooseMemberDetails(realEstateMemberData) {
  var searchformEl = document.getElementById('format-input');
  var optEl = document.createElement('option');
  optEl.value = "";
  optEl.innerHTML = "Select an agent";
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
  mainCardEl.innerHTML = "";
  for (let i = 0; i < 10; i++) {

    if (licenseNumber === realEstateMemberData[i].MemberStateLicense) {
      var memberCardEl = document.createElement("div");
      var memberNameEl = document.createElement("p");
      var jobTitleEl = document.createElement("p");
      var officeNameEl = document.createElement("p");
      var cityEl = document.createElement("p");
      var statusEl = document.createElement("p");

      memberCardEl.classList.add("card");
      memberNameEl.classList.add("memberdata");
      jobTitleEl.classList.add("memberdata");
      officeNameEl.classList.add("memberdata");
      cityEl.classList.add("memberdata");
      statusEl.classList.add("memberdata");

      memberNameEl.textContent = "FullName: " + realEstateMemberData[i].MemberFullName;
      jobTitleEl.textContent = "JobTitle: " + realEstateMemberData[i].JobTitle;
      officeNameEl.textContent = "Office: " + realEstateMemberData[i].OfficeName;
      cityEl.textContent = "City: " + realEstateMemberData[i].MemberCity;
      statusEl.textContent = "Status: " + realEstateMemberData[i].MemberStatus;

      memberCardEl.append(memberNameEl, jobTitleEl, officeNameEl, cityEl, statusEl);
      mainCardEl.append(memberCardEl);
    }
  }
};

function onSelectMemeber(event) {
  var inputValueEl = event.target.value;
  displayMemberDetails(inputValueEl);

}

getMemberData();

