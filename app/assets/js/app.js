var App = {};

(function(exports){
    
    function ServiceData(){}
    ServiceData.prototype.get = function (url, success){
        var script = document.createElement('script');
        script.src = url+"?callback=jsonp";
        
        window.jsonp = function(request){
            success(request);
            document.body.removeChild(script);
            delete window.jsonp;
        }
        document.body.appendChild(script);
    }
    exports.ServiceData = new ServiceData();
})(App);


(function(exports){
    
    function StringFormat (str, model){
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
            for(var i=0; i<team.length; i++){
                team[i].addEventListener("click", loadTeam);
            }
        });
    }
    function loadTeam(){
        var id = this.getAttribute("data-id");
        App.ServiceData.get("http://jiujitsuteam.herokuapp.com/teams/"+id+".json", function(request){
            console.log(request);
        });
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
        
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);       
    }
    
})(App);
