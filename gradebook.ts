import{ Group, groups, pupil , groupId} from './modules/groups.js';
import{ teachers, teacherId, TeacherStructure } from './modules/teachers.js';
import{ lms, arts, LMSStructure } from './modules/lms.js';
import { PupilStructure } from './modules/pupils.js';

interface Gradebooks{
    id?:string;
    level: number;
    group: Group;
    records: Record[];
}

interface Record  {
    pupilId: string;
    teacherId: string;
    subjectId: string;
    lesson: number;
    mark: number;
  };
class Gradebooks{
    groups: Map<string, Group>;
    teachers: Map<string, TeacherStructure>;
    lms: Map<string, LMSStructure>;
    m: Map<string, Gradebooks>;

    constructor(groups, teachers, lms){
        this.groups = groups;
        this.teachers = teachers;
        this.lms = lms;
        this.m = new Map();
    }
    add(level:number, groupId:string){
        for(let value of this.m.values()){
            if(value.group.id === groupId){
                throw new Error("This group already has a journal!");
            }
        }
            const group = this.groups.read(groupId);
            console.log(group);
            let journal:Gradebooks = {level, group};
            let id:string = (0|Math.random()*6.04e7).toString(36);
            journal.id = id;
            this.m.set(journal.id, journal);
            for(let value of group.pupils.values()){ value.records = []};
            return journal.id;
    }
    addRecord(gradebookId:string, record:Record){
        if(!this.m.has(gradebookId) || this.m.get(gradebookId) === undefined) {
            throw new Error ('Journal does not exist');
        } 
        const pupils = this.m.get(gradebookId)!.group.pupils;
        if(record.subjectId === undefined || record.subjectId !== this.lms.get(record.subjectId)!.id){
            throw new Error ('Subject does not exist');
        } 

        const subject = this.lms.get(record.subjectId);
        const teacher = this.teachers.read(teacherId);
        if(subject.title.toLowerCase() !== teacher.subjects[0].subject.toLowerCase()){
            throw new Error (`This teacher does not teach ${subject.title}`)
        } else if(subject.lessons < record.lesson){
            throw new Error (`There's only ${subject.lessons} lessons in class! `)
        }
        const newRecord = {
            teacher: teacher.name.first + " " + teacher.name.last,
            subject: this.lms.m.get(record.subjectId).title,
            lesson: record.lesson,
            mark: record.mark
        };
        pupils!.get(record.pupilId)!.records.push(newRecord);
    }
    read(gradebookId:string, pupilId:string){
        const pupils = this.get(gradebookId).group.pupils;
        const grades = pupils.get(pupilId).records;
        const newRecord = {
            name: pupils.get(pupilId).name.first + " " + pupils.get(pupilId).name.last,
            records: grades
        };
        return newRecord;
    }
    readAll(gradebookId:string){
        if(!this.m.has(gradebookId) || gradebookId === undefined) {
            throw new Error("parameter can't be passed");
        } else {
            const pupils = this.m.get(gradebookId)!.group.pupils;
            let arr:Gradebooks[];
            for (let key of pupils.keys()){
                let temp = this.read(gradebookId, key);
                arr.push(temp);
            };
            return arr;
        }
    }
}


const pupilId = pupil.id;
const level = 1;
const gradebooks = new Gradebooks(groups, teachers, lms);
const gradebookId = gradebooks.add(level, groupId);
console.log(gradebookId);
// // const gradebookId2 = gradebooks.add(3, groupId);

// const record = {
//     pupilId: pupilId,
//     teacherId: teacherId,
//     subjectId: history.id,
//     lesson: 1,
//     mark: 9
//   };
//   const record2 = {
//     pupilId: pupilId,
//     teacherId: teacherId,
//     subjectId: history.id,
//     lesson: 10,
//     mark: 9
//   };
//   gradebooks.addRecord(gradebookId, record);
//   gradebooks.addRecord(gradebookId, record2);

//   const oliver = gradebooks.read(gradebookId, pupilId);

//   const students = gradebooks.readAll(gradebookId);
//   console.log(students);

// console.log(students[0]);