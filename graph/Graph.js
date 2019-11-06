"use strict";
exports.__esModule = true;
// const Utils = require('./Utils');
var Utils_1 = require("../Utils");
var Graph = /** @class */ (function () {
    function Graph(data) {
        this.data = data;
        this.children = [];
    }
    Graph.prototype.is_leaf = function () {
        var _a = this, data = _a.data, children = _a.children;
        return data !== undefined && children.length == 0;
        ;
    };
    Graph.prototype.printBFS = function () {
        this._printBFS(this, 0);
    };
    Graph.prototype.create_children = function (data) {
        var children = data.map(function (datum) {
            return new Graph(datum);
        });
        this.children = children;
    };
    Graph.prototype._printBFS = function (startNode, level) {
        var _this = this;
        if (startNode === undefined || startNode === null) {
            return;
        }
        console.log(Utils_1.create_buff(level) + startNode.data + ' ' + startNode.is_leaf());
        this.children.forEach(function (child) {
            _this._printBFS(child, level + 1);
        });
    };
    Graph.prototype.build_balance_graph = function (levels, result) {
        if (result === void 0) { result = new Graph(1); }
        if (levels === 0) {
            return result;
        }
        var new_levels = levels - 1;
        var data = result.data;
        var left = new Graph(data * 2);
        result.children.push(this.build_balance_graph(new_levels, left));
        var right = new Graph(data * 2 + 1);
        result.children.push(this.build_balance_graph(new_levels, right));
        return result;
    };
    return Graph;
}());
// module.exports = { Graph };
exports["default"] = Graph;
