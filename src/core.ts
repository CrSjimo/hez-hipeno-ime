import { LatinEllinikaMap } from "./convert";
import { mode, toggle, toggleMode, toggleSuspend } from "./extension";

interface NodeNext{
    [char:string]: TreeNode|undefined;
}

class TreeNode{
    next: NodeNext = {};
    callback: (()=>string|void)|null = null;
}

type InputResult = {
    type: 'pending';
}|{
    type: 'success';
    callback: ()=>string|void;
    caps?: boolean;
}|{
    type: 'fail';
    buffer: string;
}

export const trie = new class Trie{
    root = new TreeNode();
    insert(word:string,callback:()=>string|void){
        let p = this.root;
        for(let char of word){
            if(p.next[char]){
                p = p.next[char]!;
            }else{
                p = p.next[char] = new TreeNode();
            }
        }
        p.callback = callback;
    }
    protected currentNode = this.root;
    buffer = '';
    input(char:string,suspend?:boolean):InputResult{
        this.buffer+=char;
        let caps = false;
        let _ = char.toLowerCase();
        caps = char!=_;
        char = _;
        if(suspend){
            if(this.currentNode == this.root && char == 'w'){
                this.currentNode = this.currentNode.next['w']!;
                this.buffer = 'w';
            }else if(this.currentNode != this.root && char == 'd'){
                this.buffer = '';
                let _:InputResult = {type: 'success', callback: this.currentNode.callback!, caps};
                this.currentNode = this.root;
                return _;
            }else{
                this.currentNode = this.root;
                let _:InputResult =  {type: 'fail', buffer: this.buffer};
                this.buffer = '';
                return _;
            }
            return {type: 'pending'};
        }
        if(this.currentNode.next[char]){
            this.currentNode = this.currentNode.next[char]!;
            if(this.currentNode.callback){
                this.buffer = '';
                let _ :InputResult =  {type: 'success', callback: this.currentNode.callback, caps};
                this.currentNode = this.root;
                return _;
            }else{
                return {type: 'pending'};
            }
        }else{
            this.currentNode = this.root;
            let _:InputResult =  {type: 'fail', buffer: this.buffer};
            this.buffer = '';
            return _;
        }
    }
}

trie.insert('wd',()=>{toggleSuspend(); return '';});
trie.insert('wq',()=>{toggle(); return '';});
trie.insert('wm',()=>{toggleMode(); return '';});
trie.insert('ww',()=>'');

function sel(a:string){
    if(mode.mode=='Latin')return a;
    else return LatinEllinikaMap[a] ?? a;
}

trie.insert('wa',()=>sel('á'));
trie.insert('we',()=>sel('é'));
trie.insert('wr',()=>sel('ē'));
trie.insert('wi',()=>sel('ī'));
trie.insert('wo',()=>sel('ó'));
trie.insert('wu',()=>sel('ū'));
trie.insert('wf',()=>'φ');

trie.insert('wswa',()=>sel('ä́'));
trie.insert('wswe',()=>sel('ë́'));
trie.insert('wswr',()=>sel('ē̈'));
trie.insert('wswi',()=>sel('ī̈'));
trie.insert('wswo',()=>sel('ö́'));
trie.insert('wswu',()=>sel('ṻ'));

trie.insert('wsa',()=>sel('ä'));
trie.insert('wse',()=>sel('ë'));
trie.insert('wsi',()=>sel('ï'));
trie.insert('wso',()=>sel('ö'));
trie.insert('wsu',()=>sel('ü'));
trie.insert('wsy',()=>sel('ÿ'));

trie.insert('c',()=>sel('c'));
trie.insert('e',()=>sel('e'));
trie.insert('r',()=>sel('r'));
trie.insert('t',()=>sel('t'));
trie.insert('u',()=>sel('u'));
trie.insert('i',()=>sel('i'));
trie.insert('o',()=>sel('o'));
trie.insert('p',()=>sel('p'));
trie.insert('a',()=>sel('a'));
trie.insert('s',()=>sel('s'));
trie.insert('d',()=>sel('d'));
trie.insert('f',()=>sel('f'));
trie.insert('g',()=>sel('g'));
trie.insert('h',()=>sel('h'));
trie.insert('j',()=>sel('j'));
trie.insert('k',()=>sel('k'));
trie.insert('l',()=>sel('l'));
trie.insert('z',()=>sel('z'));
trie.insert('x',()=>sel('x'));
trie.insert('q',()=>sel('q'));
trie.insert('v',()=>sel('v'));
trie.insert('b',()=>sel('b'));
trie.insert('n',()=>sel('n'));
trie.insert('m',()=>sel('m'));
trie.insert('y',()=>sel('y'));

trie.insert('wt',()=>'々');