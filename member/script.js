var searchInputSubmitEl = document.querySelector('#button');

function handleSearchInputSubmit(event) {
  event.preventDefault();

  getMemberData();
}

searchInputSubmitEl.addEventListener('click', handleSearchInputSubmit);

function getMemberData() {
    var memberDetails = 'https://api.bridgedataoutput.com/api/v2/OData/test/Member?access_token=6baca547742c6f96a6ff71b138424f21';

    fetch(memberDetails)
      .then(function (response) {
        return response.json();
      }).then(function (data) {    
        if (data.cod !== 200) {
          alert(data.value[0].OfficeKey);
        console.log(memberDetails);
        displayMemberDetails(data.value);
          return;
         
        }})
        
}

function displayMemberDetails(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        document.getElementById('memberfullname').textContent = "MemberFullName: " + element.MemberFullName;
        
        
    }
    var memberDataArr = [data.count[10],data.count[20], data.count[30], data.count[40], data.count[50], data.count[60], data.count[70] ];
   
    // document.getElementById('membertype').textContent = 
    // document.getElementById('officetype').textContent = 
    // document.getElementById('membercountry').textContent = 
    // document.getElementById('memberstatus').textContent = 
    // document.getElementById('syndicateto').textContent = 
  }