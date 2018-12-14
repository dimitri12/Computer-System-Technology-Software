
var bcrypt = require('bcrypt-nodejs');

var define = require('amdefine')(module);
define(function (require) {
    var db = require('./dbconfig.js');

});


var dbConfig = {
    server: "DIMITRI",
    database: "Kurser",
    user: "dimitri12",
    password: "mydatabase",
    port: 1433
};
module.exports = {


authenticatePassword: function(username, password) {
        var conn = new sql.Connection(dbConfig);
        
    
    var boolean;
    conn.connect(function (err) {
            if (err) { console.log(err); }
            var req = new sql.Request(conn);
        var s = squel.select();
        s.from(users);
        s.field(password);
        s.where("username = 'username'");
        req.query(s.toString(), function (err, newpassword) {
            if (err) { console.log(err); }
            if(newpassword==null){
                conn.close();
                return boolean =false;
            }
            else if(newpassword != null){
               boolean = bcrypt.compareSync(password, bcrypt.genSaltSync(50));
            }
            
        });
        conn.close();
    });
    return boolean;
},

findUsername: function (username) {
        var conn = new sql.Connection(dbConfig);
        
    
    var boolean;
    var user;
    conn.connect(function (err) {
            if (err) { console.log(err); }
            var req = new sql.Request(conn);
        var s = squel.select();
        s.from(users);
        s.field(username);
        s.where("username = 'username'");
        req.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                if(result == null){
                    alert("user doesn't exist");
                    conn.close();
                    return false;
                    }
                    console.log(result[0]);
                user = result;
            }
            
        });
        conn.close();
    });
    return user;
},

insertAccountInfo: function (username, password) {
        var conn = new sql.Connection(dbConfig);
        
    var req = new sql.Request(conn);
    var hashed;
    conn.connect(function (err) {
            if (err) { console.log(err); }
            var req = new sql.Request(conn);
        var s = squel.insert();
        s.into(users);
        s.set(username);
        req.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                //console.log(result);
                console.log("insertion of username complete");
            }
            
        });
            hashed = bcrypt(password, bcrypt.genSaltSync(50));
            req = new sql.Request(conn);
        var t = squel.insert();
        t.into(account);
        t.set(hashed);
        req.query(t.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                //console.log(result);
                console.log("insertion of password complete");
            }
            
        });
        conn.close();
    });
}
};
/*function createUserAccountList() {
    var conn = new sql.Connection(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) { console.log(err); }
        req.query("CREATE TABLE IF NOT EXIST" + account + "username varchar(9), password varchar(20)", function (err, result) {
            if (err) { console.log(err); }
            else {
                //console.log(result);
                console.log("Table" + account + "created");
            }
            conn.close();
        })
    });
}*/
