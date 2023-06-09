var selectEl = document.getElementById("officeList");
var DisplayElem = document.getElementById("cardDisplay");
var mediaCard = document.getElementById("mediaCard");
var mapCard = document.getElementById("map-card");
var footer = document.getElementById("footer");
var iframeMap = document.querySelector("#iframeMap");
var officeCities = ["wyoming", "West Virginia", " North Carolina ", " Wisconsin", "Arkansas", " California", "Texas", "New Hampshire", "Arkansas", "Massachussets "];
var mapMain = document.getElementsByClassName("map-main");
var gmapCanvas = document.getElementById("gmap_canvas");
var searchHistory = document.getElementById("searchHistory");
var cards = document.querySelector(".cards");
var contactForm = document.getElementById("sign-in");
var Name = document.getElementById("name");
var email = document.getElementById("email");
var msg =document.getElementById("message");
var submitBtn = document.getElementById("subtmit-button")
var title = document.getElementById("title")

submitBtn.addEventListener("click",function(event){
  event.preventDefault();

  var userName = Name.value.trim();
  var userEmail = email.value.trim();
  var message = msg.value.trim();

  localStorage.setItem("userName", userName);
  localStorage.setItem("userEmail", userEmail);
  localStorage.setItem("message", message);
});

function storedUserInfo(){
var userName = localStorage.getItem("userName");
var userEmail = localStorage.getItem("userEmail");
var userMessage = localStorage.getItem("message");

}
storedUserInfo();

function DefaultScreen(){
var introElem = document.createElement('div')
var introText = document.createElement('p')
introText.classList.add("intro")
introText.innerHTML = "Hello! Welcome to the offices page of Realty Reach. We have multiple office space scattered across USA that focus on sustainable and eco friendly designs. When you choose Realty Reach, we make it our personal mission to ensure you reach your forever home for the best deals available in the market.  Feel free to walk into any of our spacious and welcoming office spaces anytime from Monday to Saturday between 8am-8pm. Check out the closest office to you by choosing your State/Province in the dropbox above. Fill in your name and email id, we will get in touch with you!"
var fillForm = document.getElementById("sign-in")
fillForm.classList.add("sign-in-form")
introElem.append(fillForm)
var imageElem = document.createElement('img')
imageElem.classList.add("default-image")
imageElem.src = "https://officesnapshots.com/wp-content/uploads/2016/01/ovg-office-design-2.jpg"
introElem.append(introText)
mediaCard.append(introElem)
mediaCard.append(imageElem)
var msgToUser = document.createElement("p")
msgToUser.classList.add("storage")
msgToUser.textContent = "Hi "+localStorage.getItem ("userName")+" ! Great to see you here. We will be in touch with you within five business days.";
mediaCard.append(msgToUser)
mapCard.style.display = "none";
iframeMap.style.display = "none";


}
//call the default screen function
DefaultScreen();


//when an option is selected from the drop down, runs the event listener and displays the cards with info

selectEl.addEventListener('change', function(event){
  event.preventDefault(); 
  fetch('https://api.bridgedataoutput.com/api/v2/test/offices?access_token=6baca547742c6f96a6ff71b138424f21')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Fetching Office Data!!!");
      console.log(data);
      console.log("Moment of truth!!!!!!");
      let x = selectEl.value;
      console.log(x);
      console.log("YAYYY!");
      if (x == 10){
        location.reload();
        DefaultScreen();
      }
      mediaCard.innerHTML = '';

      let links = [
        "https://photos.zillowstatic.com/fp/1ee9655f1f9362c0018d756753e42644-se_large_800_400.webp",
        "https://www.jerde.com/thumbs/800x0/files/wonly/v2-jerde-hires-john-pauline_15899.jpg" , 
        "https://outofoffice.blog/wp-content/uploads/2021/01/Things-to-do-in-Charlotte-North-Carolina-1.jpg" ,
        "https://tse1.explicit.bing.net/th?id=OIP.IVdvLAS5113bzF-JOm2BDwHaFj&pid=Api&P=0&h=180" ,
        "https://3.bp.blogspot.com/-mbBCr-PLf3s/Wj4y1LqF2AI/AAAAAAAAAuY/yVHqruI3cS43oKtVwdLq2s8oHIp5PDD_gCPcBGAYYCw/s1600/Archkala%2B-%2BReal%2BEstate%2BOffice004.jpg" ,
        "http://a.mktgcdn.com/p/8ge9G0oXB07QyWcoRi3CUWkxIsCzRP-A6YcW9RQwKwg/260x260.jpg" ,
        "https://www.endeavor-re.com/assets/images/cache/bankPlaza-c0b831eaa5bd37beafad911007f35ff0.jpg",
        "https://officesnapshots.com/wp-content/uploads/2019/09/4-degrees-real-estate-offices-spokane.jpg" ,
        "https://www.brownrealtyco.com/wp-content/uploads/2021/10/image002-1536x664.jpg",
        "https://gbdmagazine.com/wp-content/uploads/2020/08/tmk-law-office-studio-ma-gbd-magazine-03.jpg"

      ];

      var j = x;
      
     var footerElem= document.getElementById("footer")
     footerElem.style.display="none";
      var divRow = document.createElement("div");
      divRow.classList.add("row")

      var officeName = document.createElement("h2");
      officeName.classList.add("officesName");
      officeName.innerHTML = String(data.bundle[x].OfficeName);
      console.log(officeName);

      var cardImgContainer = document.createElement("div");
      cardImgContainer.classList.add("cardImg");


      var cardElem = document.createElement("div");
      cardElem.classList.add("card");


      var addressOne = document.createElement("p");
      addressOne.classList.add("details");
      addressOne.innerHTML = " Office address: " + String(data.bundle[x].OfficeAddress1) + ", " + String(data.bundle[x].OfficePostalCode);
      console.log(addressOne);

      var province = document.createElement("p");
      province.classList.add("details");
      province.innerHTML = "State / Province: " + String(data.bundle[x].OfficeStateOrProvince);
      console.log(province);

      var emailId = document.createElement("p");
      emailId.classList.add("details");
      var emailEl = String(data.bundle[x].OfficeEmail);
      emailId.innerHTML = " email: " + emailEl;
      console.log(emailId);

      var phone = document.createElement("p");
      phone.classList.add("details");
      phone.innerHTML = " phone No.: " + String(data.bundle[x].OfficePhone);
      console.log(phone);

      var officeStatus = document.createElement("p");
      officeStatus.classList.add("details");
      officeStatus.innerHTML = "Office status : "+ String(data.bundle[x].OfficeStatus)

      cardElem.append(addressOne, province, emailId, phone, officeStatus);

     
      divRow.append(officeName)
    

      var imageContainer =document.createElement("div")
      imageContainer.classList.add("image")
      var imageElem = document.createElement("img");
      
      console.log (links[j]);
      imageElem.src = links[j]
      imageContainer.append(imageElem)

      mapCard.style.display = "block";
      iframeMap.style.display = "block";
     
      iframeMap.src = "https://maps.google.com/maps?width=520&;height=400&q=Space+Needle," + officeCities[x] + "&output=embed";

      cardImgContainer.append(cardElem,imageContainer)
      divRow.append(cardImgContainer)
    
      mediaCard.append(divRow);
     
      var searchedStates = String(data.bundle[x].OfficeStateOrProvince);
      storeState(searchedStates)


    });
  return;


});

function storeState (searchedStates){

var states = JSON.parse(localStorage.getItem("searchedStates"));
if (states !== null){
  states.push(searchedStates)
  localStorage.setItem("searchedStates", JSON.stringify(states));
} else{
  localStorage.setItem("searchedStates", JSON.stringify([searchedStates]))
}
renderStates()
}

function renderStates(){
  var states = JSON.parse(localStorage.getItem("searchedStates"));
  var statesHistory = document.getElementById("searchHistory");
  statesHistory.classList.add("search");
  statesHistory.innerHTML = " ";

states.forEach( function (state){
var stateElem = document.createElement("button");
// stateElem.textContent = state;

// statesHistory.appendChild(stateElem);
});

}



