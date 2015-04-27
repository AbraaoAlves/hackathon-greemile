var ServiceData = (function () {
    function ServiceData() {
    }
    ServiceData.prototype.teams = function () {
        var urlTeams = "jiujitsuteam.com/teams.json";
        var r = new XMLHttpRequest();
        r.open("GET", urlTeams, true);
        r.send();
        return {
            done: function (cb) {
                r.onreadystatechange = function () {
                    if (r.readyState != 4 || r.status != 200)
                        return;
                    cb(JSON.parse(r.responseText));
                };
            }
        };
    };
    return ServiceData;
})();
var App;
(function (App) {
    var Widget = (function () {
        function Widget() {
            this.el = document.querySelector("table tbody");
        }
        return Widget;
    })();
    App.Widget = Widget;
})(App || (App = {}));
//# sourceMappingURL=app.js.map