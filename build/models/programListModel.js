"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ProgramListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
exports.default = mongoose_1.model('ProgramList', ProgramListSchema);
//# sourceMappingURL=ProgramListModel.js.map