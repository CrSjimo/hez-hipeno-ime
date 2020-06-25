export let enabled = true;

export function toggleEnable(){
    enabled = !enabled;
}

export function onInput(cb:(content:string)=>string){
    let textArea = document.getElementById('edit') as HTMLTextAreaElement;
    if(textArea instanceof HTMLTextAreaElement){
        textArea.innerText = localStorage.getItem('cache')||'';
        textArea.oninput = ()=>{
            let content = textArea.value;
            localStorage.setItem('cache',content)
            if(enabled){
                textArea.value = cb(content);
            }
        }
    }else{
        throw new TypeError('Unable to get textarea element.');
    }
}