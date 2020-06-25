"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var replacing_1 = require("./replacing");
function initializing() {
    function clickToggleEnable() {
        replacing_1.toggleEnable();
        if (replacing_1.enabled) {
            toggleBtn.textContent = '付入方法不持用';
        }
        else {
            toggleBtn.textContent = '付入方法持用';
        }
    }
    var toggleBtn = document.getElementById('toggle-btn');
    var textArea = document.getElementById('edit');
    toggleBtn.onclick = clickToggleEnable;
    toggleBtn.textContent = '付入方法不持用';
    var cache = localStorage.getItem('cache');
    if (cache) {
        textArea.value = cache;
    }
    textArea.onkeydown = function (event) {
        if (event.keyCode == 17) {
            clickToggleEnable();
        }
    };
}
exports.initializing = initializing;
