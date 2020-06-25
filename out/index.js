"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initializing_1 = require("./initializing");
var replacing_1 = require("./replacing");
var input_callback_1 = require("./input_callback");
initializing_1.initializing();
replacing_1.onInput(input_callback_1.inputCallback);
