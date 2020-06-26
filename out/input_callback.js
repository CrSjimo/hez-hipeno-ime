"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCallback = exports.replacements = void 0;
exports.replacements = [
    { s: "hu", t: "φ" },
    { s: "hU", t: "φ" },
    { s: "Hu", t: "Φ" },
    { s: "HU", t: "Φ" },
    { s: "ur", t: "и" },
    { s: "uR", t: "и" },
    { s: "Ur", t: "И" },
    { s: "UR", t: "И" },
    { s: "φr", t: "φи" },
    { s: "φR", t: "φИ" },
    { s: "Φr", t: "Φи" },
    { s: "ΦR", t: "ΦИ" },
    { s: "'r", t: "r" },
    { s: "'R", t: "R" },
    { s: "'a", t: "ä" },
    { s: "'e", t: "ë" },
    { s: "'i", t: "ï" },
    { s: "'o", t: "ö" },
    { s: "'u", t: "ü" },
    { s: "'w", t: "ṻ" },
    { s: "'y", t: "ÿ" },
    { s: "'A", t: "Ä" },
    { s: "'E", t: "Ë" },
    { s: "'I", t: "Ï" },
    { s: "'O", t: "Ö" },
    { s: "'U", t: "Ü" },
    { s: "'W", t: "Ṻ" },
    { s: "'Y", t: "Ÿ" },
    { s: "w", t: "ū" },
    { s: "W", t: "Ū" },
    { s: "ct", t: "々" },
];
function inputCallback(text) {
    let targetReplacementId = -1;
    let candidates = [];
    for (let offset = 0; offset <= text.length; offset++) {
        let textIndex = text.length - offset - 1;
        let allReplacementOverflow = true;
        for (let replacementIndex = 0; replacementIndex < exports.replacements.length; replacementIndex++) {
            if (candidates[replacementIndex] == true)
                continue;
            let replacementSourceIndex = exports.replacements[replacementIndex].s.length - offset - 1;
            if (replacementSourceIndex < 0) {
                continue;
            }
            else {
                allReplacementOverflow = false;
                if (text[textIndex] == exports.replacements[replacementIndex].s[replacementSourceIndex]) {
                    targetReplacementId = replacementIndex;
                }
                else {
                    if (targetReplacementId == replacementIndex) {
                        targetReplacementId = -1;
                    }
                    candidates[replacementIndex] = true;
                }
            }
        }
        if (allReplacementOverflow)
            break;
    }
    if (targetReplacementId != -1) {
        return exports.replacements[targetReplacementId];
    }
    else {
        return undefined;
    }
}
exports.inputCallback = inputCallback;
//# sourceMappingURL=input_callback.js.map