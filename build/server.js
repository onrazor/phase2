"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
mongoose.Promise = global.Promise;
// custom modules
var supplierListRouter_1 = require("./routers/supplierListRouter");
var commodityListRouter_1 = require("./routers/commodityListRouter");
var programListRouter_1 = require("./routers/programListRouter");
var interfaceObjRouter_1 = require("./routers/interfaceObjRouter");
// Server class
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    Server.prototype.config = function () {
        mongoose.connect('mongodb://localhost/newTestDb');
        // express middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
    };
    // application routes
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/supplierList', supplierListRouter_1.default);
        this.app.use('/commodityList', commodityListRouter_1.default);
        this.app.use('/programList', programListRouter_1.default);
        this.app.use('/interfaceObj', interfaceObjRouter_1.default);
    };
    return Server;
}());
// export
exports.default = new Server().app;
//# sourceMappingURL=server.js.map