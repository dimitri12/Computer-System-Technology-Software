var sql = require('mysql');

var connection = sql.createConnection({
    host: 'localhost',
    user: 'dimitri12',
    password: 'dFC2k7Ds8',
    database: 'kurs'
});
module.exports={
    //Skapar en tabell för att lagra frågor för denna utvärderingsdatum
    createEvaluationResults: function (reference){
        //connection.connect();
        var reference1= String(reference)+ "result";
        connection.query('CREATE TABLE ?? (id int primary key, studentID varchar(10), answer1 int(3),answer2 int(3),answer3 int(3),answer4 int(3),answer5 int(3) )',[reference1], function(err, result) {
            if (err) throw err;
            console.log(result);
            });

           // connection.end();
            
    },
    
    insertEvaluationResults: function (reference, studentID, answer1, answer2, answer3, answer4, answer5){
        var reference1 = String(reference) + "result";
        
        
        //connection.connect();
        
            connection.query('INSERT INTO ('+reference1+') (studentID, answer1, answer2, answer3, answer4, answer5) VALUES (?,?,?,?,?,?)', [studentID , answer, answer2, answer3, answer4, answer5], function(err, result) {
            if (err) throw err;
            console.log(result);
            });
        
        

            //connection.end();
           
    },
    getEvaluationResults: function (reference){
        var reference1 = String(reference) + "result";
        //connection.connect();
       
        
        var q1a1=0;
        var q1a2=0;
        var q1a3=0;
        var q1a4=0;
        var q1a5=0;
        //behöver ändras
        connection.query('SELECT answer1 FROM ('+ reference1+'))' , function(err, result0) {
            if (err) throw err;
            if(result0.length==null){
                return 0;
            }
            
            });

        for(var i=0; i<result0.length; i++){
            if(result0[i]==1){
                q1a1 = q1a1+1;
            }
            if(result0[i]==2){
                q1a2= q1a2 +1;
            }
            if(result0[i]==3){
                q1a3= q1a3 +1;
            }
            if(result0[i]==4){
                q1a4= q1a4 +1;
            }
            if(result0[i]==5){
                q1a5= q1a5 +1;
            }
        }
        //resultatet ifrån databasen summeras ihop och därefter lagras i en array som skickas till en extern funktion 
        //som vill avläsa resultatet ifrån en specifik utvärdering
        var result1 = [q1a1, q1a2, q1a3, q1a4, q1a5];
            //connection.end();
        var q2a1=0;
        var q2a2=0;
        var q2a3=0;
        var q2a4=0;
        var q2a5=0;
        //behöver ändras
        connection.query('SELECT answer2 FROM ('+ reference1+'))' , function(err, result0) {
            if (err) throw err;
            if(result0==null){
                return 0;
            }
            
            });

        for(var i=0; i<result0.length; i++){
            if(result0[i]==1){
                q2a1 = q2a1+1;
            }
            if(result0[i]==2){
                q2a2= q2a2 +1;
            }
            if(result0[i]==3){
                q2a3= q2a3 +1;
            }
            if(result0[i]==4){
                q2a4= q2a4 +1;
            }
            if(result0[i]==5){
                q2a5= q2a5 +1;
            }
        }
        //resultatet ifrån databasen summeras ihop och därefter lagras i en array som skickas till en extern funktion 
        //som vill avläsa resultatet ifrån en specifik utvärdering
        var result2 = [q2a1, q2a2, q2a3, q2a4, q2a5];
        
        var q3a1=0;
        var q3a2=0;
        var q3a3=0;
        var q3a4=0;
        var q3a5=0;
        //behöver ändras
        connection.query('SELECT answer3 FROM ('+ reference1+'))' , function(err, result0) {
            if (err) throw err;
            if(result0==null){
                return 0;
            }
            
            });

        for(var i=0; i<result0.length; i++){
            if(result0[i]==1){
                q3a1 = q3a1+1;
            }
            if(result0[i]==2){
                q3a2= q3a2 +1;
            }
            if(result0[i]==3){
                q3a3= q3a3 +1;
            }
            if(result0[i]==4){
                q3a4= q3a4 +1;
            }
            if(result0[i]==5){
                q3a5= q3a5 +1;
            }
        }
        //resultatet ifrån databasen summeras ihop och därefter lagras i en array som skickas till en extern funktion 
        //som vill avläsa resultatet ifrån en specifik utvärdering
        var result3 = [q3a1, q3a2, q3a3, q3a4, q3a5];
         
        var q4a1=0;
        var q4a2=0;
        var q4a3=0;
        var q4a4=0;
        var q4a5=0;
        //behöver ändras
        connection.query('SELECT answer4 FROM ('+ reference1+'))' , function(err, result0) {
            if (err) throw err;
            if(result0==null){
                return 0;
            }
            
            });

        for(var i=0; i<result0.length; i++){
            if(result0[i]==1){
                q4a1 = q4a1+1;
            }
            if(result0[i]==2){
                q4a2= q4a2 +1;
            }
            if(result0[i]==3){
                q4a3= q4a3 +1;
            }
            if(result0[i]==4){
                q4a4= q4a4 +1;
            }
            if(result0[i]==5){
                q4a5= q4a5 +1;
            }
        }
        //resultatet ifrån databasen summeras ihop och därefter lagras i en array som skickas till en extern funktion 
        //som vill avläsa resultatet ifrån en specifik utvärdering
        var result4 = [q4a1, q4a2, q4a3, q4a4, q4a5];
        
        var q5a1=0;
        var q5a2=0;
        var q5a3=0;
        var q5a4=0;
        var q5a5=0;
        //behöver ändras
        connection.query('SELECT answer5 FROM ('+ reference1+'))' , function(err, result0) {
            if (err) throw err;
            if(result0==null){
                return 0;
            }
            
            });

        for(var i=0; i<result0.length; i++){
            if(result0[i]==1){
                q5a1 = q5a1+1;
            }
            if(result0[i]==2){
                q5a2= q5a2 +1;
            }
            if(result0[i]==3){
                q5a3= q5a3 +1;
            }
            if(result0[i]==4){
                q5a4= q5a4 +1;
            }
            if(result0[i]==5){
                q5a5= q5a5 +1;
            }
        }
        //resultatet ifrån databasen summeras ihop och därefter lagras i en array som skickas till en extern funktion 
        //som vill avläsa resultatet ifrån en specifik utvärdering
        var result5 = [q5a1, q5a2, q5a3, q5a4, q5a5];
        
        var totalresult = [result1, result2, result3, result4, result5];
            return totalresult;
    }
};
