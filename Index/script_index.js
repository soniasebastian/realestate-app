var searchInpEl = document.querySelector('.search-input')
var searchBtnEl = document.querySelector('.search-main')
var inputDivEl = document.querySelector('.input-city')
var selectCityEl = document.querySelector('.select-city')
var selectCityEl1 = document.querySelector('.select-dd')
var selectCityEl2 = document.querySelector('option')
var appnameEl = document.querySelector('.appname')
var applogoEl = document.querySelector('.applogo')
var menuEl = document.querySelector('.menu')
var menuEl = document.querySelector('.main-container')
var menu_listitngEl = document.querySelector(".menu-listings");
var listingsMenuEl = document.querySelector('.listing-btn')




var indexPage=()=>{
    menuEl.setAttribute('href',document.location.replace('./index.html'))
}
appnameEl.addEventListener('click',indexPage)
applogoEl.addEventListener('click',indexPage)


function listingPage(){
  menuEl.setAttribute('href',document.location.replace('./listings.html'))
}
listingsMenuEl.addEventListener('click',listingPage)






















