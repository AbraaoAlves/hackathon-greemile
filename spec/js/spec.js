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
///<reference path="../app/app.ts" />
///<reference path="../typings/tsd.d.ts" />
describe("dado um servicço de dados de team jiujtsu", function () {
    it("posso carregar todos os times ", function (cb) {
        var service = new ServiceData();
        service.teams().done(function (dados) {
            expect(dados).toBeDefined();
            cb();
        });
    });
});
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
///<reference path="../app/widget.ts" />
///<reference path="../typings/tsd.d.ts" />
describe("widgets tests", function () {
    it("widget should have tbody element as property", function () {
        var w = new App.Widget();
        expect(w.el).toBeDefined();
    });
});
//# sourceMappingURL=spec.js.map