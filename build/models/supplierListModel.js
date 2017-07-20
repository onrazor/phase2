"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
//import  DateSchema from "./dateSchemaModel";
var DateSchemaModel = new mongoose_1.Schema({
    basicDate: String,
    FY: String,
    FQ: String,
    CY: String,
    CQ: String,
    PY: String,
    PQ: String
});
var SupplierListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateObj: [DateSchemaModel]
});
exports.default = mongoose_1.model('SupplierList', SupplierListSchema);
//# sourceMappingURL=supplierListModel.js.map