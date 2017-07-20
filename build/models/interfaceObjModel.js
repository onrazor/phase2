"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// create a schema
var interfaceObjSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    named: {
        type: Boolean,
        required: true
    },
    supplierName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
        unique: false
    },
    time: {
        type: Date
    },
    programName: {
        type: String,
        required: true,
        unique: true
    },
    commodityName: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
// make this available to our Node applications
exports.default = mongoose_1.model('InterfaceObj', interfaceObjSchema);
//# sourceMappingURL=InterfaceObjModel.js.map