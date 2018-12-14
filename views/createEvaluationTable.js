var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'dimitri12',
    password: 'dFC2k7Ds8',
    database: 'kurs'
});
//var evData = require('./evaluationData');
module.exports={
createEvaluationAnswered: function (reference){
    var reference1 = String(reference) + "answered";
    //connection.connect();
        
        connection.query('CREATE TABLE '+ reference1 +' (id int primary key, studentID varchar(10), answered string(10))', function(err, result) {
                    if (err) throw err;
                });
        
                //console.log(result);
               console.log("created");
            
           // connection.end();
        },
    
 
    createEvaluationPassword: function (reference, time){
    var reference1 = String(reference);
		connection.query('CREATE TABLE IF NOT EXISTS evaluationPassword (password varchar(20), time int(10))', function(err, result) {
                    if (err) throw err;
                });
	
    
        
		connection.query('INSERT INTO evaluationPassword (password,time) VALUES (?,?)', [reference1,time], function(err, result) {
                    if (err) throw err;
                });

    
    },

    insertStudentHasAnswered: function (reference, studentID){
    var answered = "yes";
    //connection.connect();
        var reference1 = String(reference) + "answered";
        connection.query('INSERT INTO ' + reference1 +' (studentID, answered) VALUES (?,?)', [studentID ,answered], function(err, result) {
                    if (err) throw err;
                });
        
                //console.log(result);
               console.log("insertion done");
            
            //connection.end();
        }
    
    
};
 