import {isElem, isElem1, shuffle} from "./hilfsfunktionen.js"
import {Room as r} from "./room.js"


export class GitterNetz {
    hoch: number;
    breit: number;
    rooms: Array<r.Room>;
    edges: Array<[number, number, boolean]>;
    ende:number
    start:number
    constructor(hoch:number, breit:number) {
      this.hoch = hoch;
      this.breit = breit;
      this.rooms = [];
      for (let i =0; i < this.breit*this.hoch; i++){
        let broom = new r.Room()
        this.rooms.push([i, broom]); 
      }	
      this.edges = [];
      for (let i = 0; i < (this.hoch*this.breit); i++) {
        if ((!((i%this.breit)+1===this.breit))&&(!(h.isElem([i,i+1,false], this.edges)))) {
          this.edges.push([i,i+1,false])
        }
        if ((!(i>(this.breit*(this.hoch-1)-1)))&&(!(h.isElem([i,i+this.breit,false], this.edges)))) {
          this.edges.push([i,i+this.breit,false])
        }
      }
      this.start = Math.round(Math.random()*(this.hoch-1))
      this.ende = Math.round(Math.random()*this.hoch)
      this.dfs(5)
    }
    roomOfIndex(i:number) {
      for (var ecke of this.rooms) {
        if (ecke[0] === i) {return ecke[1]}
      }
    }
    roomNumToCoords(i:number) {
      return [(Math.floor(i/(this.breit))), i%(this.breit)]
    }
    coordsToRoomNum([x,y]:[number,number]) {
      return this.breit*y+x
    }
    findneighbours(i:number) {
      let raumliste:number[] = []
      if (!(i<=this.breit)) {raumliste.push(this.rooms[(i-this.breit)][0])}
      if (!(i%this.breit === 0)) {raumliste.push(this.rooms[(i-1)][0])}
      if (!(i%this.breit===this.breit-1)) {raumliste.push(this.rooms[(i+1)][0])}
      if (!(i>=(this.hoch-1)*this.breit)) {raumliste.push(this.rooms[(i+this.breit)][0])}
      return raumliste
    }
    dfs(probability:number = 5, start:number=0, way:number[] = [0]) {
        let next:number[] = h.shuffle(this.findneighbours(start))
        for (let room of next) {
            let in_way = h.isElem1(room, way)
            let chance = Math.random()*100 <= probability;
            if (!in_way || chance) {
                this.edges.forEach(function(value) {if((value[0] === start && value[1] === room) || (value[1] === start && value[0] === room)) {value[2] = true}})
                if (!in_way) {
                    way.push(room)
                    this.dfs(probability, room, way);
                }
            }
        }
    }
    show() {
      let strE: string = "|"
      let strS: string = " " 
      let strB: string = "_"
      let row = strE
      let str = ""
      for (let i = 0; i < this.breit; i++) {
        str = str.concat(strS.toString())
        str = str.concat(strB.toString())
      }
      console.log(str)
      strS = " "
      for (let i = 0; i < this.hoch*this.breit; i++) {
        let currentrow = Math.floor(i/this.breit)
        if (h.isElem([i, i+this.breit, false], this.edges)||i>(this.breit*(this.hoch-1))-1) {
          row = row.concat(strB.toString())
        } else {
          row = row.concat(strS.toString())
        }
        if (h.isElem([i, i+1, false], this.edges)) {
          row = row.concat(strE.toString())
        } else {
          row = row.concat(strS.toString())
        }
        if ((i+1)%this.breit=== 0) {
          row = row.substring(0, row.length - 1)
          if (!(currentrow===this.ende)) {
            row = row.concat(strE.toString())
          }
          console.log(row)
          if (currentrow===this.start) {
            row = " "
          } else {
            row = "|"
          }
        }
      }
    }
}

