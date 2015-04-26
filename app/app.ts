
class ServiceData{
    constructor(){

    }
    teams (){
        var urlTeams = "jiujitsuteam.com/teams.json";
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
}