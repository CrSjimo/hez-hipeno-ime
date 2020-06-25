"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enabled = true;
function toggleEnable() {
    exports.enabled = !exports.enabled;
}
exports.toggleEnable = toggleEnable;
function onInput(cb) {
    var textArea = document.getElementById('edit');
    if (textArea instanceof HTMLTextAreaElement) {
        textArea.innerText = localStorage.getItem('cache') || '';
        textArea.oninput = function () {
            var content = textArea.value;
            localStorage.setItem('cache', content);
            if (exports.enabled) {
                textArea.value = cb(content);
            }
        };
    }
    else {
        throw new TypeError('Unable to get textarea element.');
    }
}
exports.onInput = onInput;
