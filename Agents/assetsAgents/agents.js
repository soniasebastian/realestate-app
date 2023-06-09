var requestUrl = "https://api.bridgedataoutput.com/api/v2/test/agents?access_token=6baca547742c6f96a6ff71b138424f21";
var display = document.querySelector("#display-agent");
var input = document.querySelector('#input');
// var input2 = document.querySelector('#input2');


const getData = async () => {
    var res = await fetch(requestUrl);
    var data = await res.json();
    console.log(data);
    return data
}

const displayAgent = async () => {
    
       let query = input.value; 
       console.log("Query::", query);

       // let query2 = input.value;
       // console.log("Query::", query);
      
    var payload = await getData();
    
    let dataDisplay = payload.bundle.filter((eventData) => {
       if (query === "") {return eventData}
       else if (eventData.MemberFullName.toLowerCase().includes(query.toLowerCase())) {return eventData}
    }).map((object) => {
       //  console.log(object);
        const { MemberFullName, MemberType, OfficeName, MemberOfficePhone, MemberStateOrProvince, MemberCountry, MemberAddress1, MemberLanguages } = object;

        return `
        <div class="agent-container m-12 w-9/12 bg-gray-300 border-gray-700 rounded-lg shadow-lg pb-5">
            <h4 class="m- font-bold w-full flex flex-col relative bg-gray-400 rounded-tl-md rounded-tr-md p-5">Name: ${MemberFullName}</h4>
            <p class="center" >Type: ${MemberType}</p>
            <p class="center">Office: ${OfficeName}</p>
            <p class="center">Phone No.: ${MemberOfficePhone}</p>
            <p class="center">Location: ${MemberAddress1}, ${MemberStateOrProvince}</p>
            <p class="center">Language(s): ${MemberLanguages}</p>
        </div>
        `
    }).join("");

    display.innerHTML = dataDisplay;
}
displayAgent();

input.addEventListener("input", () =>{
       displayAgent();
});


var appnameEl = document.querySelector('.appname')
var applogoEl = document.querySelector('.applogo')
var menuEl = document.querySelector('.menu')
var menu_listitngEl = document.querySelector(".menu-listings");
var listingsMenuEl = document.querySelector('.listing-btn')




var indexPage=()=>{
    menuEl.setAttribute('href',document.location.replace('./index.html'))
}
appnameEl.addEventListener('click',indexPage)
applogoEl.addEventListener('click',indexPage)


function listingPage(){
  menuEl.setAttribute('href',document.location.replace('../Listing/listings.html'))
}
listingsMenuEl.addEventListener('click',listingPage)


