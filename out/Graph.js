"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Utils = require('./Utils');
var Utils_1 = require("../Utils");
var Graph = /** @class */ (function () {
    function Graph(data) {
        this.data = data;
        this.children = [];
        this.visited = false;
    }
    Graph.prototype.is_leaf = function () {
        var _a = this, data = _a.data, children = _a.children;
        return data !== undefined && children.length == 0;
        ;
    };
    Graph.prototype.get_child_by_value = function (data) {
        return this.children.filter(function (child) { return child.data === data; })[0];
    };
    Graph.prototype.add_child = function (g) {
        this.children.push(g);
    };
    Graph.prototype.create_children = function (data) {
        var parent = this;
        var children = data.map(function (datum) {
            var g = new Graph(datum);
            ;
            g.add_child(parent);
            return g;
        });
        this.children = children;
    };
    Graph.prototype.printBFS = function () {
        this._printBFS(this, 0);
    };
    Graph.prototype._printBFS = function (startNode, level) {
        var _this = this;
        if (startNode === undefined || startNode === null) {
            return;
        }
        if (!startNode.visited) {
            console.log(Utils_1.create_buff(level) + startNode.data + ' ' + startNode.is_leaf());
            startNode.visited = true;
        }
        var x = [];
        startNode.children
            .filter(function (child) { return !child.visited; })
            .forEach(function (child) {
            console.log(Utils_1.create_buff(level) + child.data);
            x.push(child);
        });
        x.filter(function (child) { return !child.visited; })
            .forEach(function (child) {
            child.visited = true;
            _this._printBFS(child, level + 1);
        });
    };
    Graph.prototype.printDFS = function () {
        this._printDFS(this, 0);
    };
    Graph.prototype._printDFS = function (startNode, level) {
        var _this = this;
        if (startNode === undefined || startNode === null) {
            return;
        }
        console.log(Utils_1.create_buff(level) + startNode.data + ' ' + startNode.is_leaf());
        startNode.visited = true;
        startNode.children
            .filter(function (child) { return !child.visited; })
            .forEach(function (child) {
            _this._printDFS(child, level + 1);
            child.visited = true;
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
exports.default = Graph;
//# sourceMappingURL=Graph.js.map