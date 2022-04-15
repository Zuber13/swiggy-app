const food_api = "https://cdn.adpushup.com/reactTask.json";
// food images
const imgs = [
  "./images/istockphoto-1309437466-612x612.jpg",
  "./images/photo-1429554513019-6c61c19ffb7e.jfif",
  "./images/photo-1432139509613-5c4255815697.jfif",
  "./images/photo-1478145046317-39f10e56b5e9.jfif",
  "./images/istockphoto-1299079243-170667a.jpg",
  "./images/photo-1482049016688-2d3e1b311543.jfif",
  "./images/photo-1484723091739-30a097e8f929.jfif",
  "./images/photo-1496412705862-e0088f16f791.jfif",
  "./images/photo-1506084868230-bb9d95c24759.jfif",
  "./images/istockphoto-1284690585-170667a.jpg",
];

// restaurantList

var app = document.getElementById("app");
var allRes = document.getElementById('all-res');
var listItems = document.getElementById("list-items");
var allResturents = document.querySelector("#all-resturents");
var parentElem = document.querySelector("#food-catogory");
var cate = [];
var restaurents = [];
var exclusive = [];
// fetching data

fetch(food_api)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((res) => restaurents.push(...res.restaurantList));
    data.forEach((items) => getData(items));
    // data.forEach(items => onExclusive(items));
    catePush(data);
  });
// renderingAllres(res);
function getData(items) {
  items.listNumber = 5;
  var container = document.createElement("div");
  container.setAttribute("class", items.category);
  container.setAttribute("id", items.category);
  // appending heading category
  var heading = headings(items.category);
  container.appendChild(heading);

  // loop items up to the list number
  for (var j = 0; j < items.listNumber; j++) {
    var html = renderHTML(items.restaurantList[j], j);
    container.appendChild(html);
  }

  // assing more object to create a dom element
  items.more = document.createElement("div");
  items.more.textContent = items.restaurantList.length - j + " +More";
  items.more.setAttribute("class", "more");
  container.appendChild(items.more);

  // make click function to load more restaurents foods
  let index = 5;
  items.more.addEventListener("click", function (e) {
    var resList = items.restaurantList;
    let max;
    if (resList.length > 5) {
      // var leftToLoad = resList.length - items.listNumber; // left to load
      this.textContent = index + " +More";
      max = 5;
      index += 5;
      this.textContent = resList.length - index + "+More";
      if (index === resList.length) {
        this.style.display = "none";
      }
    } else {
      items.listNumber = 5;
    }

    for (var i = items.listNumber; i < max + items.listNumber; i++) {
      var more = renderHTML(resList[i], i);
      container.insertBefore(more, this);
    }
  });
  app.appendChild(container);
}

function catePush(items) {
  items.forEach((res) => {
    var obj = {};
    obj["category"] = res.category;
    obj["index"] = res.restaurantList.length;
    cate.push(obj);
  });

  cate.push({ category: "only on swiggy" }, { category: "See All" });
  rendeListItem();
}

function rendeListItem() {
  cate.forEach((item) => {
    var list = sidebarRendering(item.category, item.index);
    listItems.appendChild(list);
  });
}

// var container_2 = document.createElement("div");
// container_2.setAttribute('class' , 'allResturents');
function renderingAllres(data) {
  allRes.innerHTML = "";
  for (var j = 0; j < data.length; j++) {
    var allRestu = renderHTML(data[j], j);
    allRes.appendChild(allRestu);
    parentElem.appendChild(allRes);
  }
}

function sidebarRendering(category, restaurantList) {
  var li = document.createElement("li");
  li.setAttribute("class", "tab");

  var aTag = document.createElement("a");

  var span = document.createElement("small");
  span.textContent = restaurantList + " Options";

  aTag.href = `#${category}`;
  aTag.textContent = category;

  if (aTag.innerText == "popular brands") {
    li.className += " active";
  }

  if (aTag.innerText == "See All") {
    aTag.href = `#all-res`;
    li.id += "see-all";
  }

  li.addEventListener("click", getItem);
  li.appendChild(aTag);
  li.appendChild(span);
  return li;
}

var see = document.querySelector("#see-all");

// making active tab funciton
function getItem(e) {
  document.querySelectorAll(".tab").forEach((list) => {
    list.classList.remove("active");
  });
  
  if (e.target.innerText === "See All") {
    allRes.classList.remove('active')
    app.classList.add('active')
    renderingAllres(restaurents);
  }else{
    app.classList.remove('active');
    allRes.classList.add('active');
  }
  e.target.parentElement.classList.add("active");
}
// making heading function to render the heading text
function headings(category) {
  var h2 = document.createElement("h2");
  h2.innerHTML = category;
  return h2;
}

// rendering all restaurent items
function renderHTML(itemList, index) {
  var div = document.createElement("div");
  div.setAttribute("class", "inline-element");
  div.innerHTML = `  <div class="parent">
                    <div class="recipe" data-target=${itemList.isExlusive}>
                    <div class="box">
                    <img src=${
                      imgs[index]
                    } width="100%" height="120px" display="block"/>
                    <br>
                    <small class="recipe-name"><b>${itemList.name}</b></small>
                    <br>
                    <small>${
                      itemList.food_types.length > 3
                        ? itemList.food_types.slice(1, 3).join(" ")
                        : itemList.food_types
                    }</small>
                    <div class="food-info"> 
                    <small class="rating"> &#8902 ${
                      itemList.ratings || 4.3
                    }</small>
                    <small class="deliver-time"> - ${
                      itemList.delivery_time
                    }</small>
                    <small class="food-price">  - ₹${
                      itemList.price_for_two
                    } For two </small>
                    </div>
                    <hr>
                    </div>
                    <div class="viwe"><b>Quick view</b></div>
                   </div>
                   </div>
                   </div>
                   </div>
                   `;

  return div;
}


// function onExclusive(items){
  // console.log('sdfg')
  // console.log(items)
  // console.log(items)
// }
// 
// var btn = document.getElementById("btn")
// btn.addEventListener('click' ,function(){
  // onExclusive(restaurents)
// });
// 
