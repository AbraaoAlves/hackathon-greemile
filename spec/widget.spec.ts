///<reference path="../app/widget.ts" />
///<reference path="../typings/tsd.d.ts" />

describe("widgets tests", function() {
    it("widget should have tbody element as property", function() {
        var w = new App.Widget();

        expect(w.el).toBeDefined();
    });
});
