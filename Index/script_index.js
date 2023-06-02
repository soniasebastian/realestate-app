var searchInpEl = document.querySelector('.search-input')
var searchBtnEl = document.querySelector('.search-main')
var inputDivEl = document.querySelector('.input-city')
var appnameEl = document.querySelector('.appname')
var applogoEl = document.querySelector('.applogo')
var menuEl = document.querySelector('.menu')

var listingsMenuEl = document.querySelector('.menu-listings')
// console.log("searchInpEl = ",searchInpEl.value)


var formSubmitHandler=(event)=>{
    event.preventDefault()

    var inpText = searchInpEl.value
    console.log("inpText = ",inpText)
    
    var queryString = window.location.href
    console.log("queryString = ",queryString)

    if(inpText){
        listingsMenuEl.setAttribute('href',document.location.replace('./listings.html?city='+inpText))
    }

}



inputDivEl.addEventListener('click',formSubmitHandler)

appnameEl.addEventListener('click',indexPage)
applogoEl.addEventListener('click',indexPage)

var indexPage=(event)=>{
    console.log("INDEX ==",event.target.value)
    menuEl.setAttribute('href',document.location.replace('./index.html'))
}



