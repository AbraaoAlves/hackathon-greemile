/// <reference path="alert.ts" />
/// <reference path="stringFormat.ts" />
/// <reference path="serviceData.ts" />

//global variables
declare var L :any;
declare var map :any;
declare var markers :Array<any>;
declare var latlng :Array<any>;
declare var per_page:number;
declare var current_page:number;
declare var loading:boolean;
declare var loadingVoid:number;

module App{
    
    export class FillGridClass{
		public el:HTMLElement;
		public templateRow:HTMLScriptElement;
        
		constructor(){
	        this.el = <HTMLElement> document.querySelector("#teams table tbody");
	        this.templateRow = <HTMLScriptElement> document.getElementById("template-row");
        }
		
		loadTeams (){
	        loading = true;
	        loadingVoid += 1;
			
            var url  = `http://jiujitsuteam.herokuapp.com/teams.json?per_page=${per_page}&page=${current_page}`;
	        
            ServiceData.get(url, data => {
	            current_page += 1;
	            
                this.load(data);    
	            
                var team = document.getElementsByClassName("team");
	            for(var i = 0, len = team.length; i < len; i++){
	                team[i].addEventListener("click", loadTeam);
	            }
	            
                if(data.length > 0){
	                loadingVoid -= 1;
	            }
	            loading = false;
	        });
	    }
        
        load (rows:Array<any>) {
            var grid = this.el;
            var template = this.templateRow; 
            grid.innerHTML = grid.innerHTML;
            
            rows.forEach(function(model){
                var row = template.innerText;
                grid.innerHTML += StringFormat(row,model);
            });
        }
	}  

    function teamActive(self:HTMLElement){
        var teams = document.getElementsByClassName("team");
        
        for(var i = 0, len = teams.length; i < len; i++){
            (<HTMLElement>teams[i]).setAttribute("class", "team");
        }
        self.setAttribute("class", "team active");
    }
    
    function loadTeam(){
        var id = this.getAttribute("data-id");
        for(var x = 0, len = markers.length; x < len; x++){
            map.removeLayer(markers[x]);  
        }
        
        Alert.hide();
        
        teamActive(this);
        
        var url = `http://jiujitsuteam.herokuapp.com/teams/${id}.json`;
        ServiceData.get(url, function(data){
            var places = data.places;
            
            if(places.length > 0){
                for(var i = 0, len = places.length; i < len; i++){
                    var gym = places[i].gym;
                    teamMap(gym.lat, gym.lng, gym.address, gym.description);
                }
            }else{
                Alert.inf("Este time não possui escolas.");
            }
            var bounds = new L.LatLngBounds(latlng);
            map.fitBounds(bounds);
        });

        return window.scroll(0, 0);
    }
    
    function teamMap(lat, lng, address, description){
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        var popup = "";
        if(description != ""){
            popup = description+"<br /><b>"+address+"</b>"
        }else{
            popup = "<b>"+address+"</b>"
        }
        var marker = new L.marker([lat, lng]);
            marker.bindPopup(popup);
            marker.addTo(map);
        markers.push(marker);
        latlng.push([lat, lng]);
    }

}