var App;
(function (App) {
    var AlertClass = (function () {
        function AlertClass() {
            this.el = document.getElementById("alert");
        }
        AlertClass.prototype.inf = function (str) {
            this.el.innerHTML = str;
            this.el.setAttribute("class", "alert alert-info");
        };
        AlertClass.prototype.hide = function () {
            this.el.innerHTML = "";
            this.el.setAttribute("class", "");
        };
        return AlertClass;
    })();
    App.AlertClass = AlertClass;
    App.Alert = new AlertClass();
})(App || (App = {}));
var App;
(function (App) {
    function StringFormat(str, model) {
        if (model["id"] >= 10) {
            model["index"] = "0";
        }
        else {
            model["index"] = "00";
        }
        for (var prop in model) {
            if (model.hasOwnProperty(prop)) {
                if (prop == "created_at") {
                    var date = new Date(model[prop]);
                    var dd = date.getDate();
                    var mm = date.getMonth() + 1;
                    var yy = date.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    str = str.replace("{created_at}", dd + "/" + mm + "/" + yy);
                }
                else {
                    var regex = new RegExp("{" + prop + "}", "g");
                    str = str.replace(regex, model[prop]);
                }
            }
        }
        return str;
    }
    App.StringFormat = StringFormat;
})(App || (App = {}));
var App;
(function (App) {
    var ServiceDataClass = (function () {
        function ServiceDataClass() {
        }
        ServiceDataClass.prototype.get = function (url, success) {
            var script = document.createElement('script');
            var parseUrl = document.createElement("a");
            parseUrl.href = url;
            if (parseUrl.search == "") {
                script.src = url + "?callback=jsonp";
            }
            else {
                script.src = url + "&callback=jsonp";
            }
            document.body.appendChild(script);
            window.jsonp = function (request) {
                success(request);
                document.body.removeChild(script);
                delete window.jsonp;
            };
        };
        return ServiceDataClass;
    })();
    App.ServiceDataClass = ServiceDataClass;
    App.ServiceData = new ServiceDataClass();
})(App || (App = {}));
/// <reference path="alert.ts" />
/// <reference path="stringFormat.ts" />
/// <reference path="serviceData.ts" />
var App;
(function (App) {
    var FillGridClass = (function () {
        function FillGridClass() {
            this.el = document.querySelector("#teams table tbody");
            this.templateRow = document.getElementById("template-row");
        }
        FillGridClass.prototype.loadTeams = function () {
            var _this = this;
            loading = true;
            loadingVoid += 1;
            var url = "http://jiujitsuteam.herokuapp.com/teams.json?per_page=" + per_page + "&page=" + current_page;
            App.ServiceData.get(url, function (data) {
                current_page += 1;
                _this.load(data);
                var team = document.getElementsByClassName("team");
                for (var i = 0, len = team.length; i < len; i++) {
                    team[i].addEventListener("click", loadTeam);
                }
                if (data.length > 0) {
                    loadingVoid -= 1;
                }
                loading = false;
            });
        };
        FillGridClass.prototype.load = function (rows) {
            var grid = this.el;
            var template = this.templateRow;
            grid.innerHTML = grid.innerHTML;
            rows.forEach(function (model) {
                var row = template.innerText;
                grid.innerHTML += App.StringFormat(row, model);
            });
        };
        return FillGridClass;
    })();
    App.FillGridClass = FillGridClass;
    function teamActive(self) {
        var teams = document.getElementsByClassName("team");
        for (var i = 0, len = teams.length; i < len; i++) {
            teams[i].setAttribute("class", "team");
        }
        self.setAttribute("class", "team active");
    }
    function loadTeam() {
        var id = this.getAttribute("data-id");
        for (var x = 0, len = markers.length; x < len; x++) {
            map.removeLayer(markers[x]);
        }
        App.Alert.hide();
        teamActive(this);
        var url = "http://jiujitsuteam.herokuapp.com/teams/" + id + ".json";
        App.ServiceData.get(url, function (data) {
            var places = data.places;
            if (places.length > 0) {
                for (var i = 0, len = places.length; i < len; i++) {
                    var gym = places[i].gym;
                    teamMap(gym.lat, gym.lng, gym.address, gym.description);
                }
            }
            else {
                App.Alert.inf("Este time não possui escolas.");
            }
            var bounds = new L.LatLngBounds(latlng);
            map.fitBounds(bounds);
        });
        return window.scroll(0, 0);
    }
    function teamMap(lat, lng, address, description) {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        var popup = "";
        if (description != "") {
            popup = description + "<br /><b>" + address + "</b>";
        }
        else {
            popup = "<b>" + address + "</b>";
        }
        var marker = new L.marker([lat, lng]);
        marker.bindPopup(popup);
        marker.addTo(map);
        markers.push(marker);
        latlng.push([lat, lng]);
    }
})(App || (App = {}));
/// <reference path="fillGrid.ts" />
var L;
var map = L.map('map').setView([-3.738961, -38.522406], 10);
var markers = [];
var latlng = [];
var per_page = 5;
var current_page = 1;
var loading = false;
var loadingVoid = 0;
(function () {
    var FillGrid = new App.FillGridClass();
    window.onload = function () {
        FillGrid.loadTeams();
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    };
    window.onscroll = function (e) {
        var windowHeight = window.innerHeight, scrollHeight = window.document.body.scrollHeight, scrollMax = scrollHeight - windowHeight, scrollTop = window.document.body.scrollTop, scrollMax20 = scrollMax - ((scrollMax * 20) / 100);
        if (scrollTop >= scrollMax20 && loading == false && loadingVoid < 2) {
            FillGrid.loadTeams();
        }
    };
})();
//# sourceMappingURL=app.js.map