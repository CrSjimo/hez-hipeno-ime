import { inputCallback, replacements } from "../input_callback";
import {expect} from 'chai';
describe('replacement',()=>{
    it('#1',()=>{
        let s="zaxsdcvfbghujiw4e5r6t"
        for(let x of replacements){
            console.log(x.s);
            expect(inputCallback(s+x.s)).equal(s+x.t);
        }
    })
})