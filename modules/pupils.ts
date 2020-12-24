import { date } from "./teachers";

  interface Phone{
    phone: string;
    primary: boolean;
  }
  interface PupilStructure{
    id?: string;
    name: {
      first: string;
      last: string;
    };
    image: string;
    dateOfBirth: string;
    phones: Array<Phone>;
    sex: string;
    description?: string;
  }

  function moreBooleans(entry:PupilStructure ){
    let primaryCount = 0;
    for (let i = 0; i < entry.phones.length; i++) {
        if (entry.phones[i].primary === true) {
            primaryCount++;
        }
    }
    if (primaryCount > 1) {
        throw new Error("You can't have more than one primary phone numbers!");
    }
}

class Pupils{
    m:Map<string, PupilStructure>;
    constructor(){
        this.m = new Map();
    }
    add(pupil:PupilStructure){
        moreBooleans(pupil);
        if(!date.test(pupil.dateOfBirth)) {
          throw new Error("You must enter a valid date of birth");
        }
        pupil.id = (0|Math.random()*6.04e7).toString(36);
        this.m.set(pupil.id, pupil);
        return pupil
    }
    read(id:string){
        return this.m.get(id)
    }
    update(id:string, updated:PupilStructure){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error("Id does not exist");
        } 
        const pupil:PupilStructure = this.m.get(id)!;
        moreBooleans(pupil);
        if(!date.test(pupil.dateOfBirth)) {
          throw new Error("You must enter a valid date of birth");
        }
        updated.id = id;
        this.m.set(id, updated);
        return this.m.get(id);
    }
    remove(id:string){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error ('user does not exist');
        } else{
            this.m.delete(id);
            // console.log('deleted');
            return true;
        }
    }
}

const data = {
    "name": {
      "first": "Marita",
      "last": "Kochua"
    },
    "image": "ulr",
    "dateOfBirth": "10/12/1997", // format date
    "phones": [
      {
        "phone": "324912321",
        "primary": true
      }
    ],
    "sex": "female", // male OR female
  }

const pupils = new Pupils();

// add pupil
const pupil = pupils.add(data);

export{pupils, pupil , PupilStructure};

