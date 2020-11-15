"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trie = void 0;
const convert_1 = require("./convert");
const extension_1 = require("./extension");
class TreeNode {
    constructor() {
        this.next = {};
        this.callback = null;
    }
}
exports.trie = new class Trie {
    constructor() {
        this.root = new TreeNode();
        this.currentNode = this.root;
        this.buffer = '';
    }
    insert(word, callback) {
        let p = this.root;
        for (let char of word) {
            if (p.next[char]) {
                p = p.next[char];
            }
            else {
                p = p.next[char] = new TreeNode();
            }
        }
        p.callback = callback;
    }
    input(char, suspend) {
        this.buffer += char;
        let caps = false;
        let _ = char.toLowerCase();
        caps = char != _;
        char = _;
        if (suspend) {
            if (this.currentNode == this.root && char == 'w') {
                this.currentNode = this.currentNode.next['w'];
                this.buffer = 'w';
            }
            else if (this.currentNode != this.root && char == 'd') {
                this.buffer = '';
                let _ = { type: 'success', callback: this.currentNode.callback, caps };
                this.currentNode = this.root;
                return _;
            }
            else {
                this.currentNode = this.root;
                let _ = { type: 'fail', buffer: this.buffer };
                this.buffer = '';
                return _;
            }
            return { type: 'pending' };
        }
        if (this.currentNode.next[char]) {
            this.currentNode = this.currentNode.next[char];
            if (this.currentNode.callback) {
                this.buffer = '';
                let _ = { type: 'success', callback: this.currentNode.callback, caps };
                this.currentNode = this.root;
                return _;
            }
            else {
                return { type: 'pending' };
            }
        }
        else {
            this.currentNode = this.root;
            let _ = { type: 'fail', buffer: this.buffer };
            this.buffer = '';
            return _;
        }
    }
};
exports.trie.insert('wd', () => { extension_1.toggleSuspend(); return ''; });
exports.trie.insert('wq', () => { extension_1.toggle(); return ''; });
exports.trie.insert('wm', () => { extension_1.toggleMode(); return ''; });
exports.trie.insert('ww', () => '');
function sel(a) {
    var _a;
    if (extension_1.mode.mode == 'Latin')
        return a;
    else
        return (_a = convert_1.LatinEllinikaMap[a]) !== null && _a !== void 0 ? _a : a;
}
exports.trie.insert('wa', () => sel('á'));
exports.trie.insert('we', () => sel('é'));
exports.trie.insert('wr', () => sel('ē'));
exports.trie.insert('wi', () => sel('ī'));
exports.trie.insert('wo', () => sel('ó'));
exports.trie.insert('wu', () => sel('ū'));
exports.trie.insert('wf', () => 'φ');
exports.trie.insert('wswa', () => sel('ä́'));
exports.trie.insert('wswe', () => sel('ë́'));
exports.trie.insert('wswr', () => sel('ē̈'));
exports.trie.insert('wswi', () => sel('ī̈'));
exports.trie.insert('wswo', () => sel('ö́'));
exports.trie.insert('wswu', () => sel('ṻ'));
exports.trie.insert('wsa', () => sel('ä'));
exports.trie.insert('wse', () => sel('ë'));
exports.trie.insert('wsi', () => sel('ï'));
exports.trie.insert('wso', () => sel('ö'));
exports.trie.insert('wsu', () => sel('ü'));
exports.trie.insert('wsy', () => sel('ÿ'));
exports.trie.insert('c', () => sel('c'));
exports.trie.insert('e', () => sel('e'));
exports.trie.insert('r', () => sel('r'));
exports.trie.insert('t', () => sel('t'));
exports.trie.insert('u', () => sel('u'));
exports.trie.insert('i', () => sel('i'));
exports.trie.insert('o', () => sel('o'));
exports.trie.insert('p', () => sel('p'));
exports.trie.insert('a', () => sel('a'));
exports.trie.insert('s', () => sel('s'));
exports.trie.insert('d', () => sel('d'));
exports.trie.insert('f', () => sel('f'));
exports.trie.insert('g', () => sel('g'));
exports.trie.insert('h', () => sel('h'));
exports.trie.insert('j', () => sel('j'));
exports.trie.insert('k', () => sel('k'));
exports.trie.insert('l', () => sel('l'));
exports.trie.insert('z', () => sel('z'));
exports.trie.insert('x', () => sel('x'));
exports.trie.insert('q', () => sel('q'));
exports.trie.insert('v', () => sel('v'));
exports.trie.insert('b', () => sel('b'));
exports.trie.insert('n', () => sel('n'));
exports.trie.insert('m', () => sel('m'));
exports.trie.insert('y', () => sel('y'));
exports.trie.insert('wt', () => '々');
//# sourceMappingURL=core.js.map