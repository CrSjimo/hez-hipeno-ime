interface NodeNext{
    [char:string]: TreeNode|undefined;
}

class TreeNode{
    next: NodeNext = {};
    callback: (()=>string|undefined)|null = null;
}

type InputResult = {
    type: 'pending';
}|{
    type: 'success';
    callback: ()=>string|undefined;
}|{
    type: 'fail';
}

export const trie = new class Trie{
    root = new TreeNode();
    insert(word:string,callback:()=>string|undefined){
        let p = this.root;
        for(let char of word){
            p = p.next[char] ?? (p.next[char]=new TreeNode());
        }
        p.callback = callback;
    }
    protected currentNode = this.root;
    buffer = '';
    input(char:string,suspend?:boolean):InputResult{
        this.buffer+=char;
        if(suspend){
            if(this.currentNode == this.root && char == 'w'){
                this.currentNode = this.currentNode.next['w']!;
                this.buffer = 'w';
            }else if(this.currentNode != this.root && char == 'd'){
                this.buffer = '';
                let _:InputResult = {type: 'success', callback: this.currentNode.callback!};
                this.currentNode = this.root;
                return _;
            }else{
                this.buffer = '';
                this.currentNode = this.root;
                return {type: 'fail'};
            }
            return {type: 'pending'};
        }
        if(this.currentNode.next[char]){
            this.currentNode = this.currentNode.next[char]!;
            if(this.currentNode.callback){
                this.buffer = '';
                let _ :InputResult =  {type: 'success', callback: this.currentNode.callback};
                this.currentNode = this.root;
                return _;
            }else{
                return {type: 'pending'};
            }
        }else{
            this.buffer = '';
            this.currentNode = this.root;
            return {type: 'fail'};
        }
    }
}

trie.insert('ws',()=>'TEST');
