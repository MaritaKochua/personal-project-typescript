
interface Email{
  email: string;
  primary: boolean;
}

interface Phone{
  phone: string;
  primary: boolean;
}
interface Subjects{
  subject: string;
}

interface TeacherStructure{
  id?: string;
  name: {
    first: string;
    last: string;
  };
  image: string;
  dateOfBirth: string;
  emails: Array<Email>;
  phones: Array<Phone>;
  sex: string;
  subjects: Subjects[];
  description?: string;
}


const date = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

function moreBooleans(entry:TeacherStructure ){
  let primaryCount = 0;
    for (let i = 0; i < entry.emails.length; i++) {
        if (entry.emails[i].primary === true) {
            primaryCount++;
        }
    }
    if (primaryCount > 1) {
        throw new Error("You can't have more than one primary email!");
    }
    let primaryCount2 = 0;
    for (let i = 0; i < entry.phones.length; i++) {
        if (entry.phones[i].primary === true) {
            primaryCount2++;
        }
    }
    if (primaryCount2 > 1) {
        throw new Error("You can't have more than one primary phone numbers!");
    }
}
class Teachers{
  m:Map<string, TeacherStructure>;
    constructor(){
        this.m = new Map();
    }
    add(teacher:TeacherStructure){
        moreBooleans(teacher);
        if(!date.test(teacher.dateOfBirth)) {
          throw new Error("You must enter a valid date of birth");
      }
        teacher.id = (0|Math.random()*6.04e7).toString(36);
        this.m.set(teacher.id, teacher);
        return teacher.id
    }
    read(id:string){
        if(!this.m.has(id)){
          throw new Error("Teacher does not exist");
        } else{
          return this.m.get(id)
        }
    }
    update(id:string, updated:TeacherStructure){
        if(!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error("Id does not exist");
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
            return true;
        }
    }
}



const teachers = new Teachers();

// teachers

const data = {
    "name": {
      "first": "Lasha",
      "last": "GvariArmaxsovs"
    },
    "image": 'url2',
    "dateOfBirth": "10/02/1990", 
    "emails": [
      {
        "email": "someemail@gmail.com",
        "primary": true,
      }
    ],
    "phones": [
      {
        "phone": "45253242",
        "primary": true
      }
    ],
    "sex": "male", // male or female
    "subjects": [
      {
        "subject": "hisTory",
      }
    ]
  }


const teacherId = teachers.add(data);

console.log(teachers.read(teacherId));


export { teachers, teacherId , date, TeacherStructure};