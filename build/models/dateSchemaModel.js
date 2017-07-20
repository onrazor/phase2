"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DateSchemaModel = new mongoose_1.Schema({
    basicDate: String,
    FY: String,
    FQ: String
    /*
    CY: String,
    CQ: String,
    PY: String,
    PQ: String
    */
});
exports.default = mongoose_1.model('DateSchema', DateSchemaModel);
//# sourceMappingURL=dateSchemaModel.js.map