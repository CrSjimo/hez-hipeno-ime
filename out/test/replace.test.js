"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_callback_1 = require("../input_callback");
var chai_1 = require("chai");
describe('replacement', function () {
    it('#1', function () {
        var s = "zaxsdcvfbghujiw4e5r6t";
        for (var _i = 0, replacements_1 = input_callback_1.replacements; _i < replacements_1.length; _i++) {
            var x = replacements_1[_i];
            console.log(x.s);
            chai_1.expect(input_callback_1.inputCallback(s + x.s)).equal(s + x.t);
        }
    });
});
