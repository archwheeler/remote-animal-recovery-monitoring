var mysql = require('mysql');

// function to establish the database connection : returns the connection (for querying)
function createConnection(){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Oracle1!",
      database: "app" //specify database
    });

    // actually establish connection
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

    return con;
}

// create all necessary tables if they don't exist
function createTables(con){

    // account table
    var sql = "CREATE TABLE IF NOT EXISTS accounts (uid INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), type INT, name VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Account table created");
    });

    // sub_account table
    sql = "CREATE TABLE IF NOT EXISTS sub_accounts (uid INT, name VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Sub-account table created");
    });

    // dog table
    sql = "CREATE TABLE IF NOT EXISTS dogs (dog_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), surgery VARCHAR(255), target_area INT, operation_date DATE)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dog table created");
    });

    // dog-user relation table
    sql = "CREATE TABLE IF NOT EXISTS dog_user (dog_id INT, uid INT)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Dog-user relation table created");
    });

    // survey info table
    sql = "CREATE TABLE IF NOT EXISTS survey (survey_id INT AUTO_INCREMENT PRIMARY KEY, uid INT, created DATE, link VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Survey info table created");
    });

    // survey-target area relation table
    sql = "CREATE TABLE IF NOT EXISTS survey_target (survey_id INT, target_area INT)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("survey-target relation table created");
    });

    // target_area table
    sql = "CREATE TABLE IF NOT EXISTS target_area (target_id INT AUTO_INCREMENT PRIMARY KEY, target_name VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("target_area table created");
    });
}

// make any alterations to a table
function alterTable(con, table_name, alteration_sql){
    var sql = "ALTER TABLE "  + table_name + " " + alteration_sql;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table " + table_name + "altered");
    });
}

//clear database function (FOR TESTING ONLY - WILL DELETE ALL DATA)
function  clearDB(con){
    var sql  = '';
    var table = '';
    showTables(connection, function(result){
        for (i = 0; i < result.length; i ++){
            table = result[i];
            sql = "DROP TABLE IF EXISTS " + table;
            con.query(sql, function(err, res){
                if (err) throw err;
                console.log("Table " + table + " dropped.");
            });
        }
    });
}

// show all tables in app database
function showTables(con, callback){
    var tables_list = [];
    con.query("SHOW TABLES", function (err, result) {
        if (err) throw err;
        var obj_list = JSON.parse(JSON.stringify(result));
        for (i = 0; i < obj_list.length; i ++){
            tables_list.push(obj_list[i]["Tables_in_app"]);
        }
        callback(tables_list);
    });
}

// add vet to system
function addVetTeam(con, email, password, vet_team_name){
    var sql = "INSERT INTO accounts (email, password, type, name) VALUES ?";
    var values = [[email, password, 0, vet_team_name]]; // 0 represents vet type
    con.query(sql, [values], function(err, result){
        if (err) throw err;
        console.log("Added vet team " + vet_team_name);
    });
}

// add name as vet subaccounts
function addVetToTeam(con, uid, name){
}

// add dog
function addDog(con, name, surgery, target_area, operation_date, uid){
    con.query("SELECT target_id FROM target_area WHERE target_name = '" + target_area + "'", function (err, target_id_res, fields){
        if (err) throw err;
        var sql_dog = "INSERT INTO dogs (name, surgery, target_area, operation_date) VALUES (" + name + ", " + surgery + ", " + target_id_res[0].target_id + ", " + operation_date +")";
        con.query(sql_dog, function(err, dog_result){
            if (err) throw err;
            var sql_dog_user = "INSERT INTO dog_user (dog_id, uid) VALUES (" + dog_result.dog_id + ", " + uid + ")";
            con.query(sql_dog_user, function(err, dog_user_result){
                if (err) throw err;
            });
        });
    });
}

// add carer
function addCarer(con, email, password, name){
    var sql = "INSERT INTO accounts (email, password, type, name) VALUES ?";
    var values = [[email, password, 1, name]]; // 1 represents carer type
    con.query(sql, [values], function(err, result){
        if (err) throw err;
        console.log("Added user " + name);
    });
}

//


var connection = createConnection();
createTables(connection);
showTables(connection, function(result){
    console.log(result);
});
clearDB(connection);
showTables(connection, function(result){
    console.log(result);
});