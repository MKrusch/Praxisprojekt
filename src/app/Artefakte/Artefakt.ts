export interface Artefakt {
    id: number;
    name: string;
    text: string;
    project: string;
    date: number;
    highlighted: boolean;

    parseDB(input:any):void; // Wandelt Datenbankobject in ein Javascript-Object um

    parseParams():String; // Wandelt Javascript-Object in einDatenbankobject um

    changeHighlight():void 
}
export enum artefactType {
    Szenario = "Szenario",
    Erfordernis = "Erfordernis",
    Anforderung = "Anforderung"
}