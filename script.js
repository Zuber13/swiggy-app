const food_api = "https://cdn.adpushup.com/reactTask.json";
const imgs = [
  "./images/photo-1429554513019-6c61c19ffb7e.jfif",
  "./images/photo-1432139509613-5c4255815697.jfif",
  "./images/photo-1478145046317-39f10e56b5e9.jfif",
  "./images/photo-1482049016688-2d3e1b311543.jfif",
  "./images/photo-1484723091739-30a097e8f929.jfif",
  "./images/photo-1496412705862-e0088f16f791.jfif",
  "./images/photo-1506084868230-bb9d95c24759.jfif",
  "./images/photo-1511690743698-d9d85f2fbf38 (1).jfif",
];


fetch(food_api)
  .then((res) => res.json())
  .then((data) => {
    renderData(data);
    // renderMore(data);
  });


function renderData(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].category === "popular brands") {
      var popular = data[i].restaurantList;
      renderHTML(popular);
    }

    if (data[i].category === "offers near you") {
      var offers = data[i].restaurantList;
      renderHTML(offers);
    }

    if (data[i].category === "Express delivery") {
      var express = data[i].restaurantList;
      renderHTML(express);
    }

    if (data[i].category === "Gourmet") {
      var gourmet = data[i].restaurantList;
      renderHTML(gourmet);
    }

    // rendering heading title
    var title = document.querySelectorAll(".title");
    var h2 = document.createElement("h2");
    h2.textContent = data[i].category;
    title[i].appendChild(h2);
  }
}

var popular = document.getElementById("popular");
var offer = document.getElementById("offer");
var expres = document.getElementById("expres");
var gourmets = document.getElementById("gourmet");

function renderHTML(data) {
  var output = "";
  for (var i = 0; i < 5; i++) {
    output += `<div class="recipe">
					<div class="box">
	                <img src=${imgs[i]} width="100%" height="120px" display="block"/>
				      <br>
	                  <small class="recipe-name"><b>${data[i].name}</b></small>
				      <br>
				      <small>${data[i].food_types.length > 3 ? data[i].food_types.slice(1, 3).join(" "): data[i].food_types}</small>
				      <div class="food-info"> 
				      <small class="rating"> &#8902 ${data[i].ratings || 4.3}</small>
				      <small class="deliver-time"> - ${data[i].delivery_time}</small>
				      <small class="food-price">  - ₹${data[i].price_for_two} For two </small>
				      </div>
				      <hr>
					</div>
          <div class="viwe"><b>Quick view</b></div>
					</div>
				  `;
  }
  popular.innerHTML = output;
  offer.innerHTML = output;
  expres.innerHTML = output;
  gourmets.innerHTML = output;
}

// var torun = 5;

var moreDiv = document.querySelectorAll('.load');

setTimeout(function(){
  moreDiv.forEach(elem => elem.addEventListener("click", renderMore));
  console.log("this is cool functin even u r not using it");
},5000)

function renderMore(element){
  fetch(food_api).then((res) => res.json()).then(data => renderElem(data , element))
}

function renderElem(data , elem){
   var parentElement = elem.target.parentElement;
   var whichToLoade = elem.target.dataset.target;

   var result = data.map(itemList => {
     if(itemList.category === whichToLoade){
          renderLoad(itemList.restaurantList , parentElement)
     }
   })
}

function renderLoad(itemToLoad , element){
  var output = "";
  var sliceItems = itemToLoad.slice(4, 9);
   for(var i=0; i<sliceItems.length;i++){
    output += `<div class="recipe">
                 <div class="box">
                        <img src=${imgs[i]} width="100%" height="120px" display="block"/>
                     <br>
                          <small class="recipe-name"><b>${sliceItems[i].name}</b></small>
                     <br>
                     <small>${sliceItems[i].food_types.length > 3 ? sliceItems[i].food_types.slice(1, 3).join(" "): sliceItems[i].food_types}</small>
                     <div class="food-info"> 
                     <small class="rating"> &#8902 ${sliceItems[i].ratings || 4.3}</small>
                     <small class="deliver-time"> - ${sliceItems[i].delivery_time}</small>
                     <small class="food-price">  - ₹${sliceItems[i].price_for_two} For two </small>
                     </div>
                 </div>
                <div class="viwe"><b>Quick view</b></div>
               </div>`;
   }

   element.innerHTML = output;
}


var tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) =>
  tab.addEventListener("click", function () {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    scrollEvnt(tab);
  })
);

function scrollEvnt(tab) {
  var elem = document.querySelector(tab.children[0].hash);
  elem.offsetTop = 0;
}
