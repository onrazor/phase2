"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateClass = (function () {
    //constructor
    function DateClass(dateFromSupplier) {
        this.basicDate = dateFromSupplier.toString();
    }
    Object.defineProperty(DateClass.prototype, "getFY", {
        //Methods for FY
        get: function () {
            return this.basicDate.slice(6, 9);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateClass.prototype, "setFY", {
        set: function (FY) {
            this.FY = FY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateClass.prototype, "getFQ", {
        //Methods for FQ
        get: function () {
            return this.basicDate.slice(6, 9);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateClass.prototype, "setFQ", {
        set: function (FQ) {
            this.FQ = FQ;
        },
        enumerable: true,
        configurable: true
    });
    return DateClass;
}()); //END: class Declaration 
exports.DateClass = DateClass;
//# sourceMappingURL=DATEClassModel.js.map