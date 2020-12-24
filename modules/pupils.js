"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pupil = exports.pupils = void 0;
const teachers_1 = require("./teachers");
function moreBooleans(entry) {
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
class Pupils {
    constructor() {
        this.m = new Map();
    }
    add(pupil) {
        moreBooleans(pupil);
        if (!teachers_1.date.test(pupil.dateOfBirth)) {
            throw new Error("You must enter a valid date of birth");
        }
        pupil.id = (0 | Math.random() * 6.04e7).toString(36);
        this.m.set(pupil.id, pupil);
        return pupil;
    }
    read(id) {
        return this.m.get(id);
    }
    update(id, updated) {
        if (!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error("Id does not exist");
        }
        const pupil = this.m.get(id);
        moreBooleans(pupil);
        if (!teachers_1.date.test(pupil.dateOfBirth)) {
            throw new Error("You must enter a valid date of birth");
        }
        updated.id = id;
        this.m.set(id, updated);
        return this.m.get(id);
    }
    remove(id) {
        if (!this.m.has(id) || this.m.get(id) === undefined) {
            throw new Error('user does not exist');
        }
        else {
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
    "dateOfBirth": "10/12/1997",
    "phones": [
        {
            "phone": "324912321",
            "primary": true
        }
    ],
    "sex": "female",
};
const pupils = new Pupils();
exports.pupils = pupils;
// add pupil
const pupil = pupils.add(data);
exports.pupil = pupil;
