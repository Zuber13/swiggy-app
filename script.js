const food_api = "https://cdn.adpushup.com/reactTask.json";
// food images
const imgs = [
  "./images/photo-1429554513019-6c61c19ffb7e.jfif",
  "./images/photo-1432139509613-5c4255815697.jfif",
  "./images/photo-1478145046317-39f10e56b5e9.jfif",
  "./images/photo-1482049016688-2d3e1b311543.jfif",
  "./images/photo-1484723091739-30a097e8f929.jfif",
  "./images/photo-1496412705862-e0088f16f791.jfif",
  "./images/photo-1506084868230-bb9d95c24759.jfif",
  "./images/istockphoto-1299079243-170667a.jpg",
  "./images/istockphoto-1309437466-612x612.jpg",
  "./images/istockphoto-1284690585-170667a.jpg"
];

// rendering api 

var resObj = [
  {category : "" , resList : {} , list : 5 , loadMore : document.createElement('div')} , 
  {category : "" , resList : {} , list : 5 , loadMore : document.createElement('div')} , 
  {category : "" , resList : {} , list : 4 , loadMore : document.createElement('div')} , 
  {category : "" , resList : {} , list : 5 ,}
];
  
var app = document.getElementById('app');
fetch(food_api)
  .then((res) => res.json())
  .then((data) => renderApi(data));


  function renderApi(data){
    console.log(data);
    for(var i=0; i < data.length;i++){
      resObj[i].resList = data[i].restaurantList;
      resObj[i].category = data[i].category;
      renderHeading(resObj[i].category);  
      renderResList(resObj[i]);
      loadMore(resObj[i].loadMore , resObj[i].category);
  }
}

function loadMore(more , category){
  more.textContent = "Load More";
  more.setAttribute('class' , 'load')
  more.setAttribute('data-target' , category);
  app.appendChild(more);
}

 function loadContent(){
  for(var i=0; i<resObj.length;i++){
    resObj[i].loadMore.addEventListener("click" , renderMore);
 }
}

 function renderMore(e){
  var matchList = e.target.dataset.target;
  for(var i=0; i<resObj.length;i++){
    if(resObj[i].category === matchList){
      resObj[i].list += 5;
      console.log(resObj[i]);
      renderResList(resObj[i]);
    }
  }
 }

 loadContent();

  function renderHeading(resObj){
    var headingText = document.createElement('h2');
    headingText.setAttribute('class' , 'title')
    headingText.textContent = resObj;
    app.appendChild(headingText);
  }

  function renderResList(obj){
    var resturenList = obj.resList;
    var listToLoad  = obj.list;
    for(j = 0; j < listToLoad;j++){
      renderHTML(resturenList[j] , j);
    }
  }


  function renderHTML(itemList , index){
    // console.log(itemList);
    var div = document.createElement('div');
    div.setAttribute('class' , 'inline-element');
    div.innerHTML =`  <div class="parent">
                      <div class="recipe" data-target=${itemList.isExlusive}>
                      <div class="box">
                      <img src=${imgs[index]} width="100%" height="120px" display="block"/>
                      <br>
                      <small class="recipe-name"><b>${itemList.name}</b></small>
                      <br>
                      <small>${itemList.food_types.length > 3 ? itemList.food_types.slice(1, 3).join(" "): itemList.food_types}</small>
                      <div class="food-info"> 
                      <small class="rating"> &#8902 ${itemList.ratings || 4.3}</small>
                      <small class="deliver-time"> - ${itemList.delivery_time}</small>
                      <small class="food-price">  - ₹${itemList.price_for_two} For two </small>
                      </div>
                      <hr>
                      </div>
                      <div class="viwe"><b>Quick view</b></div>
                     </div>
                     </div>
                     </div>
                     </div>
                     `;

    app.appendChild(div);
  }

  // renderResList();



  // store data in object































