import { Pipe } from "@angular/core";

@Pipe({
    name: 'englishCaracter',
})

export class EnglishCaracterPipe {
    constructor(){}
    transform(value: string) {
        let turkishCaracter = "ığüşöçĞÜŞİÖÇ";
        let englishCaracter = "igusocGUSIOC";
 
        for (let i = 0; i < turkishCaracter.length; i++)
        {
          value = value.replace(turkishCaracter[i], englishCaracter[i]);
        }
        
        return value;
    }
}