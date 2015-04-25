var App = {};

(function(exports){
    
    function ServiceData(){}

    ServiceData.prototype.teams = function (){

        var urlTeams = "jiujitsuteam.com/teams.json";
        var r = new XMLHttpRequest();
        r.open("GET", urlTeams, true);
        r.send();
        
        return {
            done: function(cb){
                r.onreadystatechange = function () {
                      if (r.readyState != 4 || r.status != 200) return;
                      cb(JSON.parse(r.responseText), {});
                };
            }
        }
    }   
    exports.ServiceData = ServiceData;
})(App);


(function(exports){
    
    function StringFormat (str, model){
        for(var prop in model){
            if(model.hasOwnProperty(prop)){
                str = str.replace("{"+prop+"}", model[prop]); 
            }
        }
        
        return str;
    }

    function fillGrid(){
        this.el = document.querySelector("#teams table tbody");
        this.templateRow = document.getElementById("template-row");
    }

    fillGrid.prototype.loadTest = function (){
        this.load([
            {id: 1, nome:"asdasd", nickname:"asdsdasads",data:new Date()},
            {id: 1, nome:"asdasd", nickname:"asdsdasads",data:new Date()},
            {id: 1, nome:"asdasd", nickname:"asdsdasads",data:new Date()},
            {id: 1, nome:"asdasd", nickname:"asdsdasads",data:new Date()},
            {id: 1, nome:"asdasd", nickname:"asdsdasads",data:new Date()}
        ]);
    }

    fillGrid.prototype.load = function (rows){
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
        debugger;
        App.FillGrid.loadTest();
    }
})(App);
