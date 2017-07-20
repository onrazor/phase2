"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commodityListModel_1 = require("../models/commodityListModel");
var CommodityListRouter = (function () {
    function CommodityListRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    //GET CALL
    CommodityListRouter.prototype.getCommodity = function (req, res) {
        commodityListModel_1.default.find({}, function (err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    };
    //POST CALL
    CommodityListRouter.prototype.AddCommodity = function (req, res) {
        var name = req.body.name;
        if (!name) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        var commodityList = new commodityListModel_1.default({
            name: name,
        });
        commodityList.save()
            .then(function (commodityList) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                commodityList: commodityList
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
    // update Commodity by id
    CommodityListRouter.prototype.UpdateCommodity = function (req, res, next) {
        var commodityId = req.params.commodityId;
        commodityListModel_1.default.findByIdAndUpdate(commodityId, { $set: req.body }, function (err, data) {
            if (err)
                throw err;
            res.json(req.body);
        });
    };
    CommodityListRouter.prototype.DeleteCommodity = function (req, res) {
        var commodityId = req.params.commodityId;
        commodityListModel_1.default.findByIdAndRemove(commodityId, function (err, data) {
            if (err)
                throw err;
            res.end('Commodity deleted from the database peremantely');
        });
    };
    //Connnect URIs to the specific function
    CommodityListRouter.prototype.routes = function () {
        this.router.get('/', this.getCommodity);
        this.router.post('/', this.AddCommodity);
        this.router.put('/:commodityId', this.UpdateCommodity);
        this.router.delete('/:commodityId', this.DeleteCommodity);
    };
    return CommodityListRouter;
}());
//export 
var commodityListRoutes = new CommodityListRouter();
commodityListRoutes.routes();
exports.default = commodityListRoutes.router;
//# sourceMappingURL=commodityListRouter.js.map