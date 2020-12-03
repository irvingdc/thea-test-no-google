!function(t,n){function e(){if(!a){a=!0;for(var t=0;t<d.length;t++)d[t].fn.call(window,d[t].ctx);d=[]}}function o(){"complete"===document.readyState&&e()}t=t||"docReady",n=n||window;var d=[],a=!1,c=!1;n[t]=function(t,n){if("function"!=typeof t)throw new TypeError("callback for docReady(fn) must be a function");return a?void setTimeout(function(){t(n)},1):(d.push({fn:t,ctx:n}),void("complete"===document.readyState?setTimeout(e,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",e,!1)):(document.attachEvent("onreadystatechange",o),window.attachEvent("onload",e)),c=!0)))}}("docReady",window);

var yearsAnimated = false
var yellowIconsDisplayed = false
var servicesDisplayed = false
var materialsDisplayed = false
var troquelesDisplayed = false
let intervalId = 0;
var scrollTarget

docReady(start);

function start(){
	console.log("starting")
  	setTimeout(()=>{
		showImages()
		setScrollAnimations()
		verifyYearsAnimation()
		animateMovingTexts()
		showYellowIcons()
		showServices()
		showMaterials()
		showTroqueles()
		setNavigation()
	},500);
}
function showImages(){
	document.querySelectorAll(".background-hidden").forEach(it=>{it.classList.remove("background-hidden")})
	document.querySelectorAll("[data-src]").forEach(it=>{it.setAttribute("src",it.getAttribute("data-src"))})
}
function setScrollAnimations(){
	document.querySelector("#years").innerHTML = "01"
	document.addEventListener("scroll", (event)=>{
	 	var sc = document.documentElement.scrollTop || document.body.scrollTop
		verifyYearsAnimation(sc)
		animateMovingTexts(sc)
		showYellowIcons()
		showServices()
		showMaterials()
		showTroqueles()
    }, false)
}
function setNavigation(){
	document.querySelectorAll("a.smooth").forEach((it)=>{
		it.addEventListener("click", (event)=>{
	        event.preventDefault()
	        scrollToTarget(document.querySelector(it.getAttribute("href")))
	    }, false)
	})
}
function scrollStep() {
	let sc = document.documentElement.scrollTop || document.body.scrollTop
	let diff = sc - scrollTarget
	if(diff > -20 && diff < 20) clearInterval(intervalId)
	else{
		if(sc > scrollTarget) window.scroll(0, window.pageYOffset - 20);
		else window.scroll(0, window.pageYOffset + 20);
	}
}
function scrollToTarget(target) {
	window.scroll(0, target.offsetTop -62);
}
function showMaterials(sc){
	if(!sc) sc = document.documentElement.scrollTop || document.body.scrollTop
	if(sc > (document.querySelector("#materiales").offsetTop - 2*window.innerHeight/3)  && !materialsDisplayed){
		materialsDisplayed = true
		document.querySelectorAll("#materiales .bottom-faded").forEach(it=>{it.classList.remove("bottom-faded")})
	}
}
function showTroqueles(sc){
	if(!sc) sc = document.documentElement.scrollTop || document.body.scrollTop
	if(sc > (document.querySelector("#troqueles").offsetTop - 2*window.innerHeight/3)  && !troquelesDisplayed){
		troquelesDisplayed = true
		document.querySelectorAll("#troqueles .bottom-faded").forEach(it=>{it.classList.remove("bottom-faded")})
	}
}
function showServices(sc){
	if(!sc) sc = document.documentElement.scrollTop || document.body.scrollTop
	if(sc > (document.querySelector("#servicios").offsetTop - window.innerHeight/2)  && !servicesDisplayed){
		servicesDisplayed = true
		document.querySelectorAll("#servicios .bottom-faded").forEach(it=>{it.classList.remove("bottom-faded")})
	}	
}
function animateMovingTexts(sc){
	if(!sc) sc = document.documentElement.scrollTop || document.body.scrollTop
	if(window.innerWidth > 1000){
		document.querySelector("#movingText1").style.right = (parseInt((sc-1000)/6) > 0 ? parseInt((sc-1000)/6) : 0)+"px"
		document.querySelector("#movingText2").style.left = (parseInt((sc-2300)/6) > 0 ? parseInt((sc-2300)/6) : 0)+"px"
	}
}
function showYellowIcons(sc){
	if(!sc) sc = document.documentElement.scrollTop || document.body.scrollTop
	if(sc > (document.querySelector("#nosotros").offsetTop - 50) && !yellowIconsDisplayed){
		yellowIconsDisplayed = true
		document.querySelectorAll(".yellow-icon").forEach(it=>{it.classList.remove("yellow-icon")})
	}
}
function verifyYearsAnimation(sc){
	if(!sc) sc = document.documentElement.scrollTop || document.body.scrollTop
	if(sc > 300 && !yearsAnimated) animateYears()
}
function showCloseButton(el){
	if(window.innerWidth < 1000){
		document.querySelector("#servicesClose").classList.add("visible")
		el.classList.add("visible")
	}
}
function hideCloseButton(){
	if(window.innerWidth < 1000){
		document.querySelectorAll(".visible").forEach(it=>{ it.classList.remove("visible") })
	}
}
function openNav(){
	if(window.innerWidth < 740) document.querySelector("nav").classList.add("opened")
}
function closeNav(){
	if(window.innerWidth < 740) document.querySelector("nav").classList.remove("opened")
}
function animateYears(){
	yearsAnimated = true
	var years = 0
	var html = "01"
	var yearsInterval = setInterval(()=>{
		years ++
		if(years < 10) html = "0"+years
		else if(years <= 20) html = years
		else clearInterval(yearsInterval)
		document.querySelector("#years").innerHTML = html
	},100)
}