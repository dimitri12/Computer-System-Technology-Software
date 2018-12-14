var sql = require('mysql');

/*var connection = sql.createConnection({
    host: 'localhost',
    user: 'dimitri12',
    password: 'dFC2k7Ds8',
    database: 'kurs'
});*/
module.exports={
createCourse: function (kursnamn, kursID){
    
    //connection.connect();
        
        connection.query('CREATE TABLE ?? ('+'id INT NOT NULL AUTO_INCREMENT,'+' PRIMARY KEY(id),'+ ' studentID VARCHAR(10),'+' teacherID VARCHAR(10)'+')', 
            [kursID], function(err, result) {
                    if (err) throw err;
                });
        
                console.log(result);
               // console.log("result");
            
            //connection.end();
        }
};