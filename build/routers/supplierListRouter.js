"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var supplierListModel_1 = require("../models/supplierListModel");
//import DateSchema from '../models/dateSchemaModel';
var SupplierListRouter = (function () {
    function SupplierListRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    /*
    // Helper functions: Use this functions if you implement external class for date and
    save Date as a type for mongoose schema but it's complex to make user defined types in
    mongoose schema.
    public getFY(basicDate: string) : string
    {
      var tempString = basicDate.slice(0,4);
      return tempString;
    }
    
    public getFQ(basicDate: string) : string
    {
      return "Q1";
    }
    */
    // Controller to handle HTTP request 
    SupplierListRouter.prototype.getSuppliers = function (req, res) {
        supplierListModel_1.default.find({}, function (err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    };
    SupplierListRouter.prototype.AddSupplier = function (req, res) {
        var name = req.body.name;
        var price = req.body.price;
        var basicDate = req.body.dateObj.basicDate;
        var dateObj = req.body.dateObj;
        /*
        Create functions within this AddSupplier Function to extract the information
        that you need, such as FY, FQ and so on.
        */
        function getFY(basicDate) {
            var tempString = basicDate.slice(0, 4);
            return tempString;
        }
        function getFQ(basicDate) {
            var stringMonth = basicDate.slice(5, 7);
            //Convert the month strring to number
            var numMonth = Number(stringMonth);
            var returnFQ = "";
            //Find the correct quarter and return the resulting string.
            switch (numMonth) {
                case 7:
                case 8:
                case 9:
                    //FQ1
                    returnFQ = "FQ1";
                    break;
                case 10:
                case 11:
                case 12:
                    //FQ2
                    returnFQ = "FQ2";
                    break;
                case 1:
                case 2:
                case 3:
                    //FQ3
                    returnFQ = "FQ3";
                    break;
                case 4:
                case 5:
                case 6:
                    //FQ4
                    returnFQ = "FQ4";
                    break;
                default:
                    returnFQ = "ERROR: Extracting proper FQ from ADDSupplier->getFQ fun!";
            }
            return returnFQ;
        }
        function getCY(basicDate) {
            var tempString = basicDate.slice(0, 4);
            return tempString;
        }
        function getPY(basicDate) {
            var tempString = basicDate.slice(0, 4);
            return tempString;
        }
        function getCQ(basicDate) {
            var stringMonth = basicDate.slice(5, 7);
            //Convert the month strring to number
            var numMonth = Number(stringMonth);
            var returnCQ = "";
            //Find the correct quarter and return the resulting string.
            switch (numMonth) {
                case 7:
                case 8:
                case 9:
                    //FQ1
                    returnCQ = "CQ1";
                    break;
                case 10:
                case 11:
                case 12:
                    //FQ2
                    returnCQ = "CQ2";
                    break;
                case 1:
                case 2:
                case 3:
                    //FQ3
                    returnCQ = "CQ3";
                    break;
                case 4:
                case 5:
                case 6:
                    //FQ4
                    returnCQ = "CQ4";
                    break;
                default:
                    returnCQ = "ERROR: Extracting proper CQ from ADDSupplier->getCQ fun!";
            }
            return returnCQ;
        }
        function getPQ(basicDate) {
            var stringMonth = basicDate.slice(5, 7);
            //Convert the month strring to number
            var numMonth = Number(stringMonth);
            var returnPQ = "";
            //Find the correct quarter and return the resulting string.
            switch (numMonth) {
                case 7:
                case 8:
                case 9:
                    //FQ1
                    returnPQ = "PQ1";
                    break;
                case 10:
                case 11:
                case 12:
                    //FQ2
                    returnPQ = "PQ2";
                    break;
                case 1:
                case 2:
                case 3:
                    //FQ3
                    returnPQ = "PQ3";
                    break;
                case 4:
                case 5:
                case 6:
                    //FQ4
                    returnPQ = "PQ4";
                    break;
                default:
                    returnPQ = "ERROR: Extracting proper PQ from ADDSupplier->getPQ fun!";
            }
            return returnPQ;
        }
        var FY = getFY(basicDate);
        var FQ = getFQ(basicDate);
        var CY = getCY(basicDate);
        var CQ = getCQ(basicDate);
        var PY = getPY(basicDate);
        var PQ = getPQ(basicDate);
        var supplierList = new supplierListModel_1.default({
            name: name,
            price: price,
            dateObj: [
                {
                    basicDate: basicDate,
                    FY: FY,
                    FQ: FQ,
                    CY: CY,
                    CQ: CQ,
                    PY: PY,
                    PQ: PQ
                }
            ]
        });
        if (!name || !price || !dateObj) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        supplierList.save()
            .then(function (supplierList) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                supplierList: supplierList
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
    // update supplier by id
    SupplierListRouter.prototype.UpdateSupplier = function (req, res, next) {
        var supplierId = req.params.supplierId;
        supplierListModel_1.default.findByIdAndUpdate(supplierId, { $set: req.body }, function (err, data) {
            if (err)
                throw err;
            res.json(req.body);
        });
    };
    SupplierListRouter.prototype.DeleteSupplier = function (req, res) {
        var supplierId = req.params.supplierId;
        supplierListModel_1.default.findByIdAndRemove(supplierId, function (err, data) {
            if (err)
                throw err;
            res.json(req.body);
        });
    };
    //################################################################################
    // Add Dates for a Specific Supplier
    //################################################################################
    SupplierListRouter.prototype.AddDateObj = function (req, res, next) {
        var supplierId = req.params.supplierId;
        //Create an instance of the model and assign it to the found document and then do 
        //the save and other operations. 
        var foundSupplirObj = new supplierListModel_1.default({});
        //First find the specific supplier 
        supplierListModel_1.default.findById(req.params.supplierId, function (err, supplierObj) {
            if (err)
                throw err;
            supplierListModel_1.default.schema.methods.dateObj.push(req.body);
            supplierListModel_1.default.schema.methods.dateObj.save(function (err, supplierObj) {
                if (err)
                    throw err;
                console.log('Added a new dateObj');
                res.json(supplierObj);
            });
        });
    };
    //Connnect URIs to the specific function
    SupplierListRouter.prototype.routes = function () {
        this.router.get('/', this.getSuppliers);
        this.router.post('/', this.AddSupplier);
        this.router.put('/:supplierId', this.UpdateSupplier);
        this.router.delete('/:supplierId', this.DeleteSupplier);
        //Dealing with embedded dateObj
        this.router.post('/:supplierId/dateObj', this.AddDateObj);
    };
    return SupplierListRouter;
}());
//export 
var supplierListRoutes = new SupplierListRouter();
supplierListRoutes.routes();
exports.default = supplierListRoutes.router;
//# sourceMappingURL=supplierListRouter.js.map