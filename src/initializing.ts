import { enabled, toggleEnable } from "./replacing"

export function initializing(){
    function clickToggleEnable(){
        toggleEnable();
            if(enabled){
                toggleBtn.textContent = '付入方法不持用';
            }else{
                toggleBtn.textContent = '付入方法持用';
            }
    }
    let toggleBtn = document.getElementById('toggle-btn') as HTMLButtonElement;
    let textArea = document.getElementById('edit') as HTMLTextAreaElement;
    toggleBtn.onclick = clickToggleEnable;
    toggleBtn.textContent = '付入方法不持用';
    let cache = localStorage.getItem('cache');
    if(cache){
        textArea.value = cache;
    }
    textArea.onkeydown = (event)=>{
        if(event.keyCode == 17){
            clickToggleEnable();
        }
    }
}