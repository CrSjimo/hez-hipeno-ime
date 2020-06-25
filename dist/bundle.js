/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/index.js":
/*!**********************!*\
  !*** ./out/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar initializing_1 = __webpack_require__(/*! ./initializing */ \"./out/initializing.js\");\r\nvar replacing_1 = __webpack_require__(/*! ./replacing */ \"./out/replacing.js\");\r\nvar input_callback_1 = __webpack_require__(/*! ./input_callback */ \"./out/input_callback.js\");\r\ninitializing_1.initializing();\r\nreplacing_1.onInput(input_callback_1.inputCallback);\r\n\n\n//# sourceURL=webpack:///./out/index.js?");

/***/ }),

/***/ "./out/initializing.js":
/*!*****************************!*\
  !*** ./out/initializing.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar replacing_1 = __webpack_require__(/*! ./replacing */ \"./out/replacing.js\");\r\nfunction initializing() {\r\n    function clickToggleEnable() {\r\n        replacing_1.toggleEnable();\r\n        if (replacing_1.enabled) {\r\n            toggleBtn.textContent = '付入方法不持用';\r\n        }\r\n        else {\r\n            toggleBtn.textContent = '付入方法持用';\r\n        }\r\n    }\r\n    var toggleBtn = document.getElementById('toggle-btn');\r\n    var textArea = document.getElementById('edit');\r\n    toggleBtn.onclick = clickToggleEnable;\r\n    toggleBtn.textContent = '付入方法不持用';\r\n    var cache = localStorage.getItem('cache');\r\n    if (cache) {\r\n        textArea.value = cache;\r\n    }\r\n    textArea.onkeydown = function (event) {\r\n        if (event.keyCode == 17) {\r\n            clickToggleEnable();\r\n        }\r\n    };\r\n}\r\nexports.initializing = initializing;\r\n\n\n//# sourceURL=webpack:///./out/initializing.js?");

/***/ }),

/***/ "./out/input_callback.js":
/*!*******************************!*\
  !*** ./out/input_callback.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.replacements = [\r\n    { s: \"hu\", t: \"φ\" },\r\n    { s: \"hU\", t: \"φ\" },\r\n    { s: \"Hu\", t: \"Φ\" },\r\n    { s: \"HU\", t: \"Φ\" },\r\n    { s: \"ur\", t: \"и\" },\r\n    { s: \"uR\", t: \"и\" },\r\n    { s: \"Ur\", t: \"И\" },\r\n    { s: \"UR\", t: \"И\" },\r\n    { s: \"φr\", t: \"φи\" },\r\n    { s: \"φR\", t: \"φИ\" },\r\n    { s: \"Φr\", t: \"Φи\" },\r\n    { s: \"ΦR\", t: \"ΦИ\" },\r\n    { s: \"'a\", t: \"ä\" },\r\n    { s: \"'e\", t: \"ë\" },\r\n    { s: \"'i\", t: \"ï\" },\r\n    { s: \"'o\", t: \"ö\" },\r\n    { s: \"'u\", t: \"ü\" },\r\n    { s: \"'w\", t: \"ṻ\" },\r\n    { s: \"'y\", t: \"ÿ\" },\r\n    { s: \"'A\", t: \"Ä\" },\r\n    { s: \"'E\", t: \"Ë\" },\r\n    { s: \"'I\", t: \"Ï\" },\r\n    { s: \"'O\", t: \"Ö\" },\r\n    { s: \"'U\", t: \"Ü\" },\r\n    { s: \"'W\", t: \"Ṻ\" },\r\n    { s: \"'Y\", t: \"Ÿ\" },\r\n    { s: \"w\", t: \"ū\" },\r\n    { s: \"W\", t: \"Ū\" },\r\n    { s: \"ct\", t: \"々\" },\r\n];\r\nfunction inputCallback(text) {\r\n    var targetReplacementId = -1;\r\n    var candidates = [];\r\n    for (var offset = 0; offset <= text.length; offset++) {\r\n        var textIndex = text.length - offset - 1;\r\n        var allReplacementOverflow = true;\r\n        for (var replacementIndex = 0; replacementIndex < exports.replacements.length; replacementIndex++) {\r\n            if (candidates[replacementIndex] == true)\r\n                continue;\r\n            var replacementSourceIndex = exports.replacements[replacementIndex].s.length - offset - 1;\r\n            if (replacementSourceIndex < 0) {\r\n                continue;\r\n            }\r\n            else {\r\n                allReplacementOverflow = false;\r\n                if (text[textIndex] == exports.replacements[replacementIndex].s[replacementSourceIndex]) {\r\n                    targetReplacementId = replacementIndex;\r\n                }\r\n                else {\r\n                    if (targetReplacementId == replacementIndex) {\r\n                        targetReplacementId = -1;\r\n                    }\r\n                    candidates[replacementIndex] = true;\r\n                }\r\n            }\r\n        }\r\n        if (allReplacementOverflow)\r\n            break;\r\n    }\r\n    if (targetReplacementId != -1) {\r\n        return text.slice(0, text.length - exports.replacements[targetReplacementId].s.length) + exports.replacements[targetReplacementId].t;\r\n    }\r\n    else {\r\n        return text;\r\n    }\r\n}\r\nexports.inputCallback = inputCallback;\r\n\n\n//# sourceURL=webpack:///./out/input_callback.js?");

/***/ }),

/***/ "./out/replacing.js":
/*!**************************!*\
  !*** ./out/replacing.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.enabled = true;\r\nfunction toggleEnable() {\r\n    exports.enabled = !exports.enabled;\r\n}\r\nexports.toggleEnable = toggleEnable;\r\nfunction onInput(cb) {\r\n    var textArea = document.getElementById('edit');\r\n    if (textArea instanceof HTMLTextAreaElement) {\r\n        textArea.innerText = localStorage.getItem('cache') || '';\r\n        textArea.oninput = function () {\r\n            var content = textArea.value;\r\n            localStorage.setItem('cache', content);\r\n            if (exports.enabled) {\r\n                textArea.value = cb(content);\r\n            }\r\n        };\r\n    }\r\n    else {\r\n        throw new TypeError('Unable to get textarea element.');\r\n    }\r\n}\r\nexports.onInput = onInput;\r\n\n\n//# sourceURL=webpack:///./out/replacing.js?");

/***/ })

/******/ });