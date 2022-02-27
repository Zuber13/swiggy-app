const food_api = 'https://cdn.adpushup.com/reactTask.json';
fetch(food_api)	 
	.then(res => res.json())
	.then(data => renderData(data));

function renderData(data){
	for(var i=0; i<data.length;i++){
		if(data[i].category === 'popular brands'){
			const popular =  data[i].restaurantList
			renderText(popular);
		}
	}
}

var pop = document.getElementById('pop');

function renderText(data){
 var loadMoreDiv = document.createElement('div');
 loadMoreDiv.setAttribute('class' , 'load-more')
 var text = document.createElement('span');
 text.textContent = "+" + (data.length - 5) + "more";

	for(var i=0; i <= 5; i++){
		console.log(data.length - 5)
		var div = document.createElement('div');
		div.setAttribute('class','box');
		// loadMoreDiv.textContent = Number(data[i].length - 5);
		var span = document.createElement('span');
		span.textContent = data[i].name;
		div.appendChild(span);
		pop.appendChild(div);
	}
	
	loadMoreDiv.appendChild(text);
	pop.appendChild(loadMoreDiv);

};