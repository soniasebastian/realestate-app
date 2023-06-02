var appnameEl = document.querySelector('.appname')
var applogoEl = document.querySelector('.applogo')
var menuEl = document.querySelector('.menu')



var indexPage=(event)=>{
    console.log("INDEX ==",event.target.value)
    menuEl.setAttribute('href',document.location.replace('./index.html'))
}




appnameEl.addEventListener('click',indexPage)
applogoEl.addEventListener('click',indexPage)


