var App = {},
    map = L.map('map').setView([-3.738961, -38.522406], 12),
    markers = [],
    latlng = [];

(function(exports){
    
    function ServiceData(){}
    ServiceData.prototype.get = function (url, success){
        var script = document.createElement('script');
        script.src = url+"?callback=jsonp";
        document.body.appendChild(script);
        window.jsonp = function(request){
            success(request);
            document.body.removeChild(script);
            delete window.jsonp;
        }
    }
    exports.ServiceData = new ServiceData();
})(App);

(function(exports){
    function Alert(){
        this.el = document.getElementById("alert");
    }
    Alert.prototype.inf = function(string){
        this.el.innerHTML = string;
        this.el.setAttribute("class", "alert alert-info");
    }
    Alert.prototype.hide = function(){
        this.el.innerHTML = "";
        this.el.setAttribute("class", "");
    }
    exports.Alert = new Alert();
})(App);


(function(exports){
    
    function StringFormat (str, model){
        // fix images directory
        if (model["id"] >= 10) {
            model["index"] = "0";
        } else {
            model["index"] = "00";
        }

        for(var prop in model){
            if(model.hasOwnProperty(prop)){
                if(prop == "created_at"){
                    var date = new Date(model[prop]),
                        dd = date.getDate(),
                        mm = date.getMonth() + 1,
                        yy = date.getFullYear();
                    if(dd<10){
                        dd='0'+dd;
                    } 
                    if(mm<10){
                        mm='0'+mm;
                    }        
                    date = dd+"/"+mm+"/"+yy;             
                    str = str.replace("{created_at}", date);
                }else{
                    var regex = new RegExp("{"+prop+"}", "g");
                    str = str.replace(regex, model[prop]);
                }
            }
        }
        
        return str;
    }

    function fillGrid(){
        this.el = document.querySelector("#teams table tbody");
        this.templateRow = document.getElementById("template-row");
    }

    fillGrid.prototype.loadTeams = function (){
        App.ServiceData.get("http://jiujitsuteam.herokuapp.com/teams.json", function(request){
            App.FillGrid.load(request);    
            var team = document.getElementsByClassName("team");
            for(var i = 0, len = team.length; i < len; i++){
                team[i].addEventListener("click", loadTeam);
            }
        });
    }
    function teamActive(self){
        var teams = document.getElementsByClassName("team");
        for(var i = 0, len = teams.length; i < len; i++){
            teams[i].setAttribute("class", "team");
        }
        self.setAttribute("class", "team active");
    }
    function loadTeam(){
        var id = this.getAttribute("data-id");
        for(var x = 0, len = markers.length; x < len; x++){
            map.removeLayer(markers[x]);  
        }
        App.Alert.hide();
        teamActive(this);
        App.ServiceData.get("http://jiujitsuteam.herokuapp.com/teams/"+id+".json", function(request){
            var places = request.places;
            if(places.length > 0){
                for(var i = 0, len = places.length; i < len; i++){
                    var gym = places[i].gym;
                    teamMap(gym.lat, gym.lng, gym.address, gym.description);
                }
            }else{
                App.Alert.inf("Este time não possui escolas.");
            }
            var bounds = new L.LatLngBounds(latlng);
            map.fitBounds(bounds);
        });
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
    fillGrid.prototype.load = function(rows){
        var grid = this.el;
        var template = this.templateRow; 
        grid.innerHTML = "";
        
        rows.forEach(function(model){
            var row = template.innerText;
            grid.innerHTML += StringFormat(row,model);
        });
    }

    exports.FillGrid = new fillGrid();
})(App);

//module start
(function(){
    window.onload = function(){
        App.FillGrid.loadTeams();
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    
})(App);
