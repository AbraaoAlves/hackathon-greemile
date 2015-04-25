var teste = (function () {
    function teste() {
        this.name = "";
    }
    teste.prototype.foo = function () {
        this.name = "asdasdasdasd";
    };
    return teste;
})();
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
describe("asdasd", function () {
    it("teste foo", function () {
        var t = new teste();
        t.foo();
        expect(t.name).toEqual("asdasdasdasd");
    });
});
describe("dado um servicço de dados de team jiujtsu", function () {
    it("posso carregar todos os times ", function (cb) {
        var service = new ServiceData();
        service.teams().done(function (dados) {
            expect(dados).toBeDefined();
            cb();
        });
    });
});
//# sourceMappingURL=spec.js.map