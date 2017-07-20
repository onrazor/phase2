"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommodityListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports.default = mongoose_1.model('CommodityList', CommodityListSchema);
//# sourceMappingURL=commodityListModel.js.map