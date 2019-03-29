import { Injectable } from '@angular/core';
import { AngularNeo4jService } from '../../node_modules/angular-neo4j';
import { Szenario } from './Artefakte/Szenario';
import { Erfordernis } from './Artefakte/Erfordernis';
import { Anforderung } from './Artefakte/Anforderung';
import { Artefakt } from './Artefakte/Artefakt';

@Injectable({
  providedIn: 'root'
})
export class NeohandlerService {

  constructor(private neo4j: AngularNeo4jService) { }

  connect() {
    // Übernommen aus https://github.com/webmaxru/angular-neo4j#readme
    const url = 'bolt://localhost:7687';
    const username = 'neo4j';
    const password = '123456789';
    const encrypted = false; // true wirft häufig Fehler, lässt sich aber nicht fi

    this.neo4j
      .connect(
        url,
        username,
        password,
        encrypted
      )
      .then(driver => {
        if (driver) {
          console.log(`Successfully connected to ${url}`);
        }
      });
  }
  
/*
  async getAllAnforderungen() { 
    this.connect();

    const query = 'match (n:Anforderung) return n';

    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis

    let anforderungen:Anforderung[] = null;
    try{
      anforderungen = new Array(promise.length);
      for(var i=0;i<promise.length;i++) {
        let anforderung = new Anforderung();
        anforderung.parseDB(promise[i][0]); 
        anforderungen[i] = anforderung;
      }
    } catch(err) {
      console.log(err);
    }
    this.neo4j.disconnect()
    return anforderungen; // Datenbankpromise zurückgeben (Gibt selber wieder ein Promise zurück, da asynchron.)
  }
*/
  async getAll(artefakt: Artefakt = new Szenario()) { // Falls kein Parameter übergeben wird, dann nimm einfach Szenario (impliziert, dass szenario optional ist.)
    this.connect();

    let type = artefakt.constructor.name; // Gibt Namen der Klasse aus
    const query = "match (n:"+type+") return n"; // Suchabfrage nach der Klasse

    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis

    let result: Artefakt[] = null;
    let temp: Artefakt;

    try{ 
    
      result = new Array(promise.length);
      for(var i=0;i<promise.length;i++) { // weird, weil das switchcase jedes mal ausgeführt wird
        switch(type) { // Notwendig, damit man die Objekte den richtigen Klassen zuordnen kann. Sonst hat man ein Szenario als Instanz der Klasse Erfordernis etc.
          case "Szenario": {
            temp = new Szenario();
            break;
          }
          case "Erfordernis": {
            temp = new Erfordernis();
            break;
          }
          case "Anforderung": {
            temp = new Anforderung();
            break;
          }
          default: {
            temp = new Anforderung();
          }
        }
        
        temp.parseDB(promise[i][0]); 
        result[i] = temp;
      }
    } catch(err) {
      console.log(err);
    }

    this.neo4j.disconnect()
    return result; // Datenbankpromise zurückgeben (Gibt selber wieder ein Promise zurück, da asynchron.)
  }

  async getSzenario(artefakt: Artefakt) {
    this.connect();

    let query;
    let params = { id: artefakt.id };
    let type = artefakt.constructor.name; // Gibt Namen der Klasse aus

    if(type=="Szenario") {
      query = "match (a:Szenario) where ID(a) = "+artefakt.id+" return a";
    } else if(type=="Erfordernis") {
      query = "match (a:Szenario)-[c:bedingt*]->(b:Erfordernis) where ID(b) = "+artefakt.id+" return a"; // Suchabfrage nach der Klasse
    } else {
      query = "match (a:Szenario)-[c:bedingt*]->(b:Anforderung) where ID(b) = "+artefakt.id+" return a"; // Suchabfrage nach der Klasse
    }

    let promise = await this.neo4j.run(query, params); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis

    let result: Szenario[] = new Array(promise.length);
    let temp;

    for(var i=0;i<promise.length;i++) { 
      temp = new Szenario();
      temp.parseDB(promise[i][0]); 
      result[i] = temp;
    }

    this.neo4j.disconnect()
    return result; // Datenbankpromise zurückgeben (Gibt selber wieder ein Promise zurück, da asynchron.)
  }

  async getErfordernis(artefakt: Artefakt) {
    this.connect();

    let query;
    let type = artefakt.constructor.name; // Gibt Namen der Klasse aus

    if(type=="Erfordernis") {
      query = "match (a:Erfordernis) where ID(a) = "+artefakt.id+" return a";
    } else if(type=="Szenario") {
      query = "match (a:Szenario)-[c:bedingt*]->(b:Erfordernis) where ID(a) = "+artefakt.id+" return b"; // Suchabfrage nach der Klasse
    } else {
      query = "match (a:Erfordernis)-[c:bedingt*]->(b:Anforderung) where ID(b) = "+artefakt.id+" return a"; // Suchabfrage nach der Klasse
    }

    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis

    let result: Erfordernis[] = new Array(promise.length);
    let temp;

    for(var i=0;i<promise.length;i++) { 
      temp = new Erfordernis();
      temp.parseDB(promise[i][0]); 
      result[i] = temp;
    }

    this.neo4j.disconnect();
    return result; // Datenbankpromise zurückgeben (Gibt selber wieder ein Promise zurück, da asynchron.)
  }

  async getAnforderung(artefakt: Artefakt) {
    this.connect();

    let query;
    let params = { id: artefakt.id };
    let type = artefakt.constructor.name; // Gibt Namen der Klasse aus

    if(type=="Anforderung") {
      query = "match (a:Anforderung) where ID(a) = "+artefakt.id+" return a";
    } else if(type=="Szenario") {
      query = "match (a:Szenario)-[c:bedingt*]->(b:Anforderung) where ID(a) = "+artefakt.id+" return b"; // Suchabfrage nach der Klasse
    } else {
      query = "match (a:Erfordernis)-[c:bedingt*]->(b:Anforderung) where ID(a) = "+artefakt.id+" return b"; // Suchabfrage nach der Klasse
    }

    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis

    let result: Anforderung[] = new Array(promise.length);
    let temp;

    for(var i=0;i<promise.length;i++) { 
      temp = new Anforderung();
      temp.parseDB(promise[i][0]); 
      result[i] = temp;
    }

    this.neo4j.disconnect();
    return result; // Datenbankpromise zurückgeben (Gibt selber wieder ein Promise zurück, da asynchron.)
  }

  async createSzenario(szenario: Szenario) {
    this.connect();

    let query = "create (a:Szenario {"+szenario.parseParams()+"}) return a";
    //console.log(query);
    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis
    let result:Szenario = new Szenario();
    result.parseDB(promise[0][0]);
    this.neo4j.disconnect();
    return result.id;
  }

  async createErfordernis(erfordernis: Erfordernis) {
    this.connect();

    let query = "create (a:Erfordernis {"+erfordernis.parseParams()+"}) return a";
    //console.log(query);
    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis
    let result:Erfordernis = new Erfordernis();
    result.parseDB(promise[0][0]);
    this.neo4j.disconnect();
    return result.id;
  }

  async createAnforderung(anforderung: Anforderung) {
    this.connect();

    let query = "create (a:Anforderung {"+anforderung.parseParams()+"}) return a";
    //console.log(query);
    let promise = await this.neo4j.run(query); // Datenbankpromise abwarten / await stoppt den Code an dieser Stelle, und wartet auf ein Ergebnis
    let result:Anforderung = new Anforderung();
    result.parseDB(promise[0][0]);
    this.neo4j.disconnect();
    return result.id;
  }

  async getSpecificArtefact(id:number){
    this.connect();

    let query = "match (a) where ID(a) = "+id+" return a";
    let promise = await this.neo4j.run(query);
    let result:Artefakt = new Szenario();

    result.parseDB(promise[0][0]);
    
    this.neo4j.disconnect();
    return result;
  }

  async deleteArtefact(id:number){
    this.connect();

    let query = "match (a) where ID(a) = "+id+" detach delete a";
    let promise = await this.neo4j.run(query);

    this.neo4j.disconnect();
  }

  async changeArtefakt(artefakt:Artefakt){
    this.connect();
    let query = "match (a) where ID(a) = "+artefakt.id+" set a.name = '"+artefakt.name+
      "', a.project = '"+artefakt.project+"', a.text = '"+artefakt.text+"', a.date = "+artefakt.date;
    console.log(query);
    try{
      var promise = await this.neo4j.run(query);
    }catch(e){
      console.log("Error in Ändernfunktion1");
      console.log(e);
    }
    
    let result:Artefakt = new Szenario();

    result.parseDB(promise[0][0]);
    
    this.neo4j.disconnect();
    return result;
  }

}