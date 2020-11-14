"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trie = void 0;
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
        var _a;
        let p = this.root;
        for (let char of word) {
            p = (_a = p.next[char]) !== null && _a !== void 0 ? _a : (p.next[char] = new TreeNode());
        }
        p.callback = callback;
    }
    input(char, suspend) {
        this.buffer += char;
        if (suspend) {
            if (this.currentNode == this.root && char == 'w') {
                this.currentNode = this.currentNode.next['w'];
                this.buffer = 'w';
            }
            else if (this.currentNode != this.root && char == 'd') {
                this.buffer = '';
                let _ = { type: 'success', callback: this.currentNode.callback };
                this.currentNode = this.root;
                return _;
            }
            else {
                this.buffer = '';
                this.currentNode = this.root;
                return { type: 'fail' };
            }
            return { type: 'pending' };
        }
        if (this.currentNode.next[char]) {
            this.currentNode = this.currentNode.next[char];
            if (this.currentNode.callback) {
                this.buffer = '';
                let _ = { type: 'success', callback: this.currentNode.callback };
                this.currentNode = this.root;
                return _;
            }
            else {
                return { type: 'pending' };
            }
        }
        else {
            this.buffer = '';
            this.currentNode = this.root;
            return { type: 'fail' };
        }
    }
};
exports.trie.insert('ws', () => 'TEST');
//# sourceMappingURL=core.js.map