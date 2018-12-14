var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'dimitri12',
    password: 'dFC2k7Ds8',
    database: 'kurs'
});
module.exports={
    //Skapar en tabell för att lagra frågor för denna utvärderingsdatum
    createEvaluationQuestion: function (reference){
    var reference1 = String(reference) + "question";
   // connection.connect();
        
        connection.query('CREATE TABLE '+ reference1 +' (id int primary key, question String(100))', function(err, result) {
                    if (err) throw err;
                console.log(result);
                });
        
                
               // console.log("result");
            
           // connection.end();
            return result;
        },
    getEvaluationQuestion: function (reference, id){
    
  // connection.connect();
        
        connection.query('SELECT * FROM '+ String(reference) +' WHERE id = ?', [String(id)], function(err, result) {
                    if (err) throw err;
            if (result == null) {
                return 0;
            }
                });
        
                
               // console.log("result");
            
          //  connection.end();
            return result;
    },
    getEvaluationQuestionLength: function (reference) {
        var reference1 = String(reference) + "question";
        // connection.connect();
        
        connection.query('SELECT COUNT(*) FROM ' + String(reference1)+'', function (err, result) {
            if (err) throw err;
            if (result == null) {
                return 0;
            }
        });
        
        
        // console.log("result");
        
        //  connection.end();
        return result;
    },
    storeQuestion: function (reference, question){
    //connection.connect();
        var reference1 = String(reference) + "question";
        connection.query('INSERT INTO '+ String(reference1) +' VALUES (?)', [question], function(err, result) {
                    if (err) throw err;
                console.log("insertion of question done");
                });
        
                
               // console.log("result");
            
            //connection.end();
        }
};
