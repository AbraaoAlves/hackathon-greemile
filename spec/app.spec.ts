///<reference path="../app/app.ts" />
///<reference path="../typings/tsd.d.ts" />

describe("dado um servicço de dados de team jiujtsu", function(){
    it("posso carregar todos os times ", function(cb){
        var service = new ServiceData();

        service.teams().done(function(dados){
            expect(dados).toBeDefined();
            cb();
            
        });
    });
});

