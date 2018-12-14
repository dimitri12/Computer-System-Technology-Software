var sql = require('mysql');

/*var connection = sql.createConnection({
    host: 'localhost',
    user: 'dimitri12',
    password: 'dFC2k7Ds8',
    database: 'kurs'
});*/
module.exports={
storeQuestion: function (reference, question){
    //connection.connect();
        var reference1 = reference.toString() + question.toString();
        connection.query('INSERT INTO ? VALUES (?)',[reference1], [question], function(err, result) {
                    if (err) throw err;
                console.log("insertion of question done");
                });
        
                
               // console.log("result");
            
            //connection.end();
        }
    
 
};