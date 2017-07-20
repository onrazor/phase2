"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var InterfaceObjModel_1 = require("../models/InterfaceObjModel");
var InterfaceObjRouter = (function () {
    function InterfaceObjRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    InterfaceObjRouter.prototype.getInterfaceObj = function (req, res) {
        InterfaceObjModel_1.default.find({}, function (err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    };
    InterfaceObjRouter.prototype.AddInterfaceObj = function (req, res) {
        //Retrice the information to insert in the document
        var name = req.body.name;
        var type = req.body.type;
        var named = req.body.named;
        var supplierName = req.body.supplierName;
        var price = req.body.price;
        var time = req.body.time;
        var programName = req.body.programName;
        var commodityName = req.body.commodityName;
        if (!name || !price || !type || !named || !supplierName || !programName || !commodityName || !time) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        //Create a new Object of type InterfaceObj to enter the document
        var interfaceObj = new InterfaceObjModel_1.default({
            name: name,
            type: type,
            named: named,
            supplierName: supplierName,
            price: price,
            time: time,
            programName: programName,
            commodityName: commodityName
        });
        //Insert the new document into the collection
        interfaceObj.save()
            .then(function (interfaceObj) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                interfaceObj: interfaceObj
            });
        })
            .catch(function (error) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                error: error
            });
        });
    };
    //PUT CALL 
    InterfaceObjRouter.prototype.UpdateInterfaceObj = function (req, res, next) {
        var interfaceObjId = req.params.interfaceObjId;
        InterfaceObjModel_1.default.findByIdAndUpdate(interfaceObjId, { $set: req.body }, function (err, data) {
            if (err)
                throw err;
            res.json(req.body);
        });
    };
    //DELETE CALL	
    InterfaceObjRouter.prototype.DeleteInterfaceObj = function (req, res) {
        var interfaceObjId = req.params.interfaceObjId;
        InterfaceObjModel_1.default.findByIdAndRemove(interfaceObjId, function (err, data) {
            if (err)
                throw err;
            res.end('The interfacObj you specified has been removed permanently from the database.');
        });
    };
    //Connnect URIs to the specific function
    InterfaceObjRouter.prototype.routes = function () {
        this.router.get('/', this.getInterfaceObj);
        this.router.post('/', this.AddInterfaceObj);
        this.router.put('/:interfaceObjId', this.UpdateInterfaceObj);
        this.router.delete('/:interfaceObjId', this.DeleteInterfaceObj);
    };
    return InterfaceObjRouter;
}());
//export 
var InterfaceObjRoutes = new InterfaceObjRouter();
InterfaceObjRoutes.routes();
exports.default = InterfaceObjRoutes.router;
//# sourceMappingURL=interfaceObjRouter.js.map