///<reference path="../app/app.ts" />
///<reference path="../typings/tsd.d.ts" />

describe("asdasd", function(){
    it("teste foo", function(){
        var t = new teste();
        t.foo();
        expect(t.name).toEqual("asdasdasdasd");
    });    
});


describe("dado um servicço de dados de team jiujtsu", function(){
    it("posso carregar todos os times ", function(cb){
        var service = new ServiceData();

        service.teams().done(function(dados){
            expect(dados).toBeDefined();
            cb();
            
        });
    });
});

