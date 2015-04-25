var App = {};

(function(exports){
    var urlTeams = "jiujitsuteam.com/teams.json";
    
    function ServiceData(){}

    ServiceData.prototype.teams = function (){

        var r = new XMLHttpRequest();
        r.open("GET", urlTeams, true);
        r.send();
        
        return {
            done: function(cb){
                r.onreadystatechange = function () {
                      if (r.readyState != 4 || r.status != 200) return;
                      cb(JSON.parse(r.responseText));
                };
            }
        }
    }   
    exports.ServiceData = ServiceData;
})(App);


(function(exports){
    
})(App);
