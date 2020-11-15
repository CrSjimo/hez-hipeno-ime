export let LatinEllinikaMap:{[p:string]:string|undefined} = {};
export let EllinikaLatinMap:{[p:string]:string|undefined} = {};

function add(latin:string,ellinika:string){
    LatinEllinikaMap[latin] = ellinika;
    LatinEllinikaMap[latin.toUpperCase()] = ellinika.toUpperCase();
    EllinikaLatinMap[ellinika] = latin;
    EllinikaLatinMap[ellinika.toUpperCase()] = latin.toUpperCase();
}

export function convert(str:string,target:'Latin'|'Ἐληινικά'){
    let mp = target == 'Latin'?EllinikaLatinMap:LatinEllinikaMap;
    for(let c of Object.keys(mp)){
        str = str.replace(new RegExp(c,'g'),mp[c]!);
    }
    return str;
}

add('ä́','ἄ');
add('ë́','ἔ');
add('ē̈','ἒ');
add('ī̈','ἲ');
add('ö́','ὄ');
add('ṻ','ὒ');
add('ÿ','ἀῐ');
add('y','αῐ');

add('á','ά');
add('é','έ');
add('ē','ὲ');
add('ī','ὶ');
add('ó','ό');
add('ū','ὺ');

add('ä','ἀ');
add('ë','ἐ');
add('ï','ἰ');
add('ö','ὀ');
add('ü','ὐ');

add('c','ς');
add('e','ε');
add('r','ρ');
add('t','τ');
add('u','υ');
add('i','ι');
add('o','ο');
add('p','π');
add('a','α');
add('s','σ');
add('d','δ');
//f
add('g','γ');
add('h','η');
add('j','ξ');
add('k','κ');
add('l','λ');
add('z','ζ');
add('x','χ');
add('q','ψ');
add('v','ω');
add('b','β');
add('n','ν');
add('m','μ');