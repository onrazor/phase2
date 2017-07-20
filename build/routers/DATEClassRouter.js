"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DateClass = (function () {
    function DateClass(date) {
        this.router = express_1.Router();
        this.routes();
    }
    //GET CALL
    DateClass.prototype.getProgram = function (req, res) {
        ProgramList.find({}, function (err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    };
    //POST CALL
    DateClass.prototype.AddProgram = function (req, res) {
        var name = req.body.name;
        if (!name) {
            res.status(422).json({ message: 'All Fields Required.' });
        }
        var programList = new ProgramList({
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
    DateClass.prototype.UpdateProgram = function (req, res, next) {
        var programId = req.params.programId;
        ProgramList.findByIdAndUpdate(programId, { $set: req.body }, function (err, data) {
            if (err)
                throw err;
            res.send('Updated the name of the specified program permanently');
        });
    };
    //DELETE CALL
    DateClass.prototype.DeleteProgram = function (req, res) {
        var programId = req.params.programId;
        ProgramList.findByIdAndRemove(programId, function (err, data) {
            if (err)
                throw err;
            res.end('program deleted from the database peremantely');
        });
    };
    //Connnect URIs to the specific function
    DateClass.prototype.routes = function () {
        this.router.get('/', this.getProgram);
        this.router.post('/', this.AddProgram);
        this.router.put('/:programId', this.UpdateProgram);
        this.router.delete('/:programId', this.DeleteProgram);
    };
    return DateClass;
}());
//export 
var ProgramListRoutes = new ProgramListRouter();
ProgramListRoutes.routes();
exports.default = ProgramListRoutes.router;
//# sourceMappingURL=DATEClassRouter.js.map