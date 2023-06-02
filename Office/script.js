var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener('click', function(event){
event.preventDefault(); 
getData();  
});

function getData(){
    fetch ('https://api.bridgedataoutput.com/api/v2/test/offices?access_token=6baca547742c6f96a6ff71b138424f21')
    .then(function (response) {
        return response.json();})

    .then(function (data) {
        console.log ("Fetching Office Data!!!")
        console.log (data)
        
        for (i = 0; i < 10; i ++){

    var cardElem = document.createElement("div")
    cardElem.classList.add("card")

    var timeStamp = document.createElement("p")
    timeStamp.classList.add("details")
    timeStamp.innerHTML = "Time Stamp : "+ String(data.bundle[i].BridgeModificationTimestamp);
    console.log(timeStamp)

    var officeName = document.createElement("p")
    officeName.classList.add("details")
    officeName.innerHTML = " Office Name : "+ String(data.bundle[i].OfficeName);
    console.log(officeName)

    cardElem.append(timeStamp, officeName)
    dataCard.append(cardElem)
        }
    return;
})}


