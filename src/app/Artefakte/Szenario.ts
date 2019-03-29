import { Artefakt } from "./Artefakt";

export class Szenario implements Artefakt {

    id: number;
    name: string;
    text: string;
    project: string;
    date: number;
    highlighted: boolean = false;

    parseDB (input:any) {
        this.id = input.identity
        this.name = input.properties.name;
        this.text = input.properties.text;
        this.project = input.properties.project;
        this.date = input.properties.date
    }

    parseParams():String {
        let result = new String();

        result = result.concat("name: '"+this.name+"', ");
        result = result.concat("text: '"+this.text+"', ");
        result = result.concat("project: '"+this.project+"', ");
        result = result.concat("date: "+this.date+"");

        console.log(result)
        return result;
    }

    changeHighlight():void {
        this.highlighted=!this.highlighted;
    }
}