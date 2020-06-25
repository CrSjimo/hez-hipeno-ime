"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    { s: "φR", t: "φи" },
    { s: "Φr", t: "ΦИ" },
    { s: "ΦR", t: "ΦИ" },
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
    var targetReplacementId = -1;
    var candidates = [];
    for (var offset = 0; offset < text.length; offset++) {
        var textIndex = text.length - offset - 1;
        var allReplacementOverflow = true;
        for (var replacementIndex = 0; replacementIndex < exports.replacements.length; replacementIndex++) {
            if (candidates[replacementIndex] == true)
                continue;
            var replacementSourceIndex = exports.replacements[replacementIndex].s.length - offset - 1;
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
        return text.slice(0, text.length - exports.replacements[targetReplacementId].s.length) + exports.replacements[targetReplacementId].t;
    }
    else {
        return text;
    }
}
exports.inputCallback = inputCallback;
