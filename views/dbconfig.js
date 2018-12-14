module.exports = {
    createConnection: function (dbConfig) {
        var connection = new mysql.Connection(dbConfig);
       // var req = new sql.Request(conn);
    },
    closeConnection: function () { conn.end(); }
};