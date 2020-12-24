import { pupil, pupils, PupilStructure } from './pupils.js';

interface Group{
    id?: string;
    room: number;
    pupils?: Map<string, object>;
}

class Groups{
    m:Map<string, Group>;
    constructor(){
        this.m = new Map();
    }
    add(room:number){
        for (let value of this.m.values()) {
            if(value.room === room){
                throw new Error('This room is busy!')
            }
        };
            let group:Group = {room};
            group.id = (0|Math.random()*6.04e7).toString(36);
            group.pupils = new Map();
            this.m.set(group.id, group);
            return group.id
    }
    remove(id:string){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
            this.m.delete(id);
            return true;
            }
    }
    read(id:string){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
        return this.m.get(id)
        }
    }
    readAll(x:any){
        if(!!x) {
            throw new Error("Parameter can't be passed");
        } else {
            let arr: Group[] = [];
            for (let value of this.m.values()) arr.push(value);
            // console.log('arr');
            return arr;
        }
    }
    update(id:string, updated:object){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error("Id does not exist");
        } 
        let newUser:Group = this.m.get(id)!;
        let newkey = Object.keys(updated)[0];
        console.log(newUser);
        let value = Object.values(updated)[0]; 
        newUser.room = value;
        this.m.set(id, newUser)
        return this.m.get(id);
    }
    addPupil(id:string, pupil:PupilStructure){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else{
            let group:Group = this.m.get(id)!;
            group.pupils!.set(pupil.id!, pupil);
        }
    }
    removePupil(id:string, pupil:string){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('Group does not exist');
        } else if(!this.m.get(id)!.pupils!.has(pupil)){
            throw new Error ('Pupil is not in this group!');
        } else{
            let group:Group = this.m.get(id)!;
            group.pupils!.delete(pupil);
            return true;
        }
    }
}
const room = 236;
const room2 = 206;

const groups = new Groups();

const groupId = groups.add(room);
const groupId2 = groups.add(room2);

groups.update(groupId, {
    room: 237
  });
// groups.addPupil(groupId, pupil);


export{ Group, groups, pupil, groupId };