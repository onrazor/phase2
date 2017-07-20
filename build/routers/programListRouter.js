"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProgramListModel_1 = require("../models/ProgramListModel");
var ProgramListRouter = (function () {
    function ProgramListRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    //GET CALL
    ProgramListRouter.prototype.getProgram = function (req, res) {
        ProgramListModel_1.default.find({}, function (err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    };
    //POST CALL
    ProgramListRouter.prototype.AddProgram = function (req, res) {
        var name = req.body.name;
        if (!name) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        var programList = new ProgramListModel_1.default({
            name: name,
        });
        programList.save()
            .then(function (programList) {
            var code = res.statusCode;
            var msg = res.statusMessage;
            res.json({
                code: code,
                msg: msg,
                programList: programList
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
    ProgramListRouter.prototype.UpdateProgram = function (req, res, next) {
        var programId = req.params.programId;
        ProgramListModel_1.default.findByIdAndUpdate(programId, { $set: req.body }, function (err, data) {
            if (err)
                throw err;
            res.send('Updated the name of the specified program permanently');
        });
    };
    //DELETE CALL
    ProgramListRouter.prototype.DeleteProgram = function (req, res) {
        var programId = req.params.programId;
        ProgramListModel_1.default.findByIdAndRemove(programId, function (err, data) {
            if (err)
                throw err;
            res.end('program deleted from the database peremantely');
        });
    };
    //Connnect URIs to the specific function
    ProgramListRouter.prototype.routes = function () {
        this.router.get('/', this.getProgram);
        this.router.post('/', this.AddProgram);
        this.router.put('/:programId', this.UpdateProgram);
        this.router.delete('/:programId', this.DeleteProgram);
    };
    return ProgramListRouter;
}());
//export 
var ProgramListRoutes = new ProgramListRouter();
ProgramListRoutes.routes();
exports.default = ProgramListRoutes.router;
//# sourceMappingURL=programListRouter.js.map