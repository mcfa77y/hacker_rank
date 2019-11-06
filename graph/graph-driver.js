"use strict";
exports.__esModule = true;
var Graph_1 = require("./Graph");
var t = new Graph_1["default"](1);
var u = t.build_balance_graph(2);
u.printBFS();
