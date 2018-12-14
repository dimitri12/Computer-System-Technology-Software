
var angular = require('angular');
var dbserver = require('./views/server');

//denna fil är endast för att kunna separera lärare och studentkonton
// hashID avgör om den id är antingen en lärare eller student
//vilket reducerar programmeringen av funktionerna som ska 
//inhämta information ifrån databasen

/*var dbConfig = {
    server: "DIMITRI",
    database: "Kurser",
    user: "dimitri12",
    password: "mydatabase",
    port: 1433
};*/
module.exports ={
hashID: function (id) {
    if (id.length == 8 && isInteger(parseInt(id.charAt(6))) && isInteger(parseInt(id.charAt(7)))) {
        return student;
    }
    else if (id.length == 6) {
        return teacher;
    }
    else { return error;}
},
//inhämta registrerade kurser ifrån denne persons konto
getRegisteredCourse: function (id) {
    var newid = hashID(id);
    if (newid == student) {
        dbserver.getCoursesOfAStudent(id);
    }
    else if (newid == teacher) {
            dbserver.getCoursesOfATeacher(id);
    }
},
//lägga till en ny kurs för detta konto
insertNewCourseForRegistration: function (id, kursID) {
    var newid = hashID(id);
    if (newid == student) {
            dbserver.insertStudentIntoCourse(id, kursID);
            dbserver.registerCourseForStudent(id, kursID);
    }
    else if (newid == teacher) {
            dbserver.insertTeacherIntoCourse(id, kursID);
            dbserver.registerCourseForTeacher(id, kursID);
    }
},
//tar bort en registrerad kurs omm detta konto är registrerad på denna kurs
deleteRegisteredCourse: function (id, kursID) {
    var newid = hashID(id);

    if (newid == student) {
        if (isStudentReadingThisCourse(id, kursID) == true) {
                dbserver.deleteStudentFromCourse(id, kursID);
                dbserver.deleteCourseFromStudent(id, kursID);
        }
        else { return console.log("Wrong ID or this student doesn't read this course"); }


    }
    if (newid == teacher) {
        if (isTeacherTeachingThisCourse(id, kursID) == true) {
                dbserver.deleteTeacherFromCourse(id, kursID);
                dbserver.deleteCourseFromTeacher(id, kursID);
        }
        else { return console.log("Wrong ID or this teacher doesn't teach this course"); }
    }
},
    //inhämta information angående ett konto inom en kurs
getInformationOfStudentOrTeacher: function (id, kursID) {
        var newid = hashID(id);
        var info = null;
        if (newid == student) {
            if (isStudentReadingThisCourse(id, kursID) == true) {
                info = dbserver.getStudentIDFromCourse(id, kursID);
                //function getInformationForAStudent(){} 
            }
            else { return info; }
        }
        if (newid == teacher) {
            if (isTeacherTeachingThisCourse(id, kursID) == true) {
                info = dbserver.getTeacherIDFromCourse(id, kursID);
                //function getInformationForATeacher(){} 
            }
            else { return info; }
        }
        return info;
    }
};