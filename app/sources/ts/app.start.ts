/// <reference path="fillGrid.ts" />
/// <reference path="../../../typings/leaflet/leaflet.d.ts" />

//initialize global variables
var map :any = L.map('map').setView([-3.738961, -38.522406], 10);
var markers :Array<any> = [];
var latlng :Array<any> = [];
var per_page:number = 5;
var current_page:number = 1;
var loading:boolean = false;
var loadingVoid:number = 0;

(()=>{

	var FillGrid = new App.FillGridClass();
	
	window.onload = () => {
    
		FillGrid.loadTeams();
	    
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	    }).addTo(map);
	}
	
	window.onscroll = e => {
	    var windowHeight = window.innerHeight,
	        scrollHeight = window.document.body.scrollHeight,
	        scrollMax = scrollHeight - windowHeight,
	        scrollTop = window.document.body.scrollTop,
	        scrollMax20 = scrollMax - ((scrollMax * 20) / 100);
	    
		if(scrollTop >= scrollMax20 && loading == false && loadingVoid < 2){
	        FillGrid.loadTeams();
	    }
	}
})();
