interface Subject{
    title: string;
    lessons: number;
    description?: string;
    id?: string;
  }

  // const addUID = <T extends object>(obj: T) => {
  //     let uid = (0|Math.random()*6.04e7).toString(36);
  //     return {...obj, uid}
  // }

// create subject
class Subject{
  title: string;
  lessons: number;
  description?: string;
  id?: string;

  constructor(sub:Subject){
    this.title = sub.title;
    this.lessons = sub.lessons;
    this.description = sub.description;
    let uid:string= (0|Math.random()*6.04e7).toString(36);
    this.id = uid;
  }
}

enum LMSStructure {

}

class LMS{
  m:Map<string,Subject>;
  constructor(){
      this.m = new Map();
  }
  add(sub:Subject){
      for (let value of this.m.values()){
          if (value.title === sub.title){
              throw new Error('Subject already exists')
          }
      }
    this.m.set(sub.id!, sub);
  }
  remove(sub:Subject){
      if(!this.m.has(sub.title) || this.m.get(sub.title) === undefined) {
          throw new Error ('This subject does not exist');
      } else{
          this.m.delete(sub.id!);
          return true;
      }
  }
  verify(sub:Subject){
          for (let value of this.m.values()) {
              if (value.title.toLowerCase()  === sub.title.toLowerCase() ){
                  return true
              } else{
                  return false
              }
          };
  }
  readAll(x:any){
      if(!!x) {
          throw new Error("parameter can't be passed");
      } else {
          let arr:Subject[]= [];
          for (let value of this.m.values()) arr.push(value);
          return arr;
      }
  }
}

const lms = new LMS();

// subjects

  const arts = new Subject({
    title: 'Arts',
    lessons: 2
  });
  
  const math = new Subject({
    title: 'Math',
    lessons: 60
  });

  const notMath = new Subject({
    title: 'notMath',
    lessons: 10
  });
  
    lms.add(arts);
    lms.add(arts);
    lms.add(math);



export{ lms, arts };