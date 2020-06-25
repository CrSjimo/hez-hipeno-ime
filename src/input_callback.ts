export const replacements = [
    {s:"hu", t:"φ"},
    {s:"hU", t:"φ"},
    {s:"Hu", t:"Φ"},
    {s:"HU", t:"Φ"},
    {s:"ur", t:"и"},
    {s:"uR", t:"и"},
    {s:"Ur", t:"И"},
    {s:"UR", t:"И"},
    {s:"φr", t:"φи"},
    {s:"φR", t:"φи"},
    {s:"Φr", t:"ΦИ"},
    {s:"ΦR", t:"ΦИ"},
    {s:"'a", t:"ä"},
    {s:"'e", t:"ë"},
    {s:"'i", t:"ï"},
    {s:"'o", t:"ö"},
    {s:"'u", t:"ü"},
    {s:"'w", t:"ṻ"},
    {s:"'y", t:"ÿ"},
    {s:"'A", t:"Ä"},
    {s:"'E", t:"Ë"},
    {s:"'I", t:"Ï"},
    {s:"'O", t:"Ö"},
    {s:"'U", t:"Ü"},
    {s:"'W", t:"Ṻ"},
    {s:"'Y", t:"Ÿ"},
    {s:"w", t:"ū"},
    {s:"W", t:"Ū"},
    {s:"ct", t:"々"},
]

export function inputCallback(text:string){
    let targetReplacementId = -1;
    let candidates:boolean[] = [];
    for(let offset = 0;offset<text.length;offset++){
        let textIndex = text.length-offset-1;
        let allReplacementOverflow = true;
        for(let replacementIndex = 0;replacementIndex < replacements.length;replacementIndex++){
            if(candidates[replacementIndex]==true)continue;
            let replacementSourceIndex = replacements[replacementIndex].s.length-offset-1;
            if(replacementSourceIndex<0){
                continue;
            }else{
                allReplacementOverflow = false;
                if(text[textIndex]==replacements[replacementIndex].s[replacementSourceIndex]){
                    targetReplacementId = replacementIndex;
                }else{
                    if(targetReplacementId == replacementIndex){
                        targetReplacementId = -1;
                    }
                    candidates[replacementIndex]=true;
                }
            }
        }
        if(allReplacementOverflow)break;
    }
    if(targetReplacementId!=-1){
        return text.slice(0,text.length-replacements[targetReplacementId].s.length)+replacements[targetReplacementId].t;
    }else{
        return text;
    }
}