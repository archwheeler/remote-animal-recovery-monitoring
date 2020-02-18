var mysql = require('mysql');

// function to establish the database connection : returns the connection (for querying)
function createConnection(){
    var con = mysql.createConnection({
      host: "localhost", //TODO
      user: "root",
      password: "Oracle1!", //TODO: don't leave this in plain text!
      database: "app" //specify database
    });

    // actually establish connection
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

    return con;
}

// TODO: make email have unique requirement
// TODO: add chat client table (keep track of chat topics)
// create all necessary tables if they don't exist
function createTables(con){

    // account table
    var sql = "CREATE TABLE IF NOT EXISTS accounts (uid INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255), type INT, name VARCHAR(255))";
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
    sql = "CREATE TABLE IF NOT EXISTS dogs (dog_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), op_id INT, target_area INT, operation_date DATE)";
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

    // table of questionnaires
    sql = "CREATE TABLE IF NOT EXISTS questionnaires (questionnaire_id INT AUTO_INCREMENT PRIMARY KEY, uid INT, created DATE, link VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("questionnaires table created");
    });

    // table of operations
    sql = "CREATE TABLE IF NOT EXISTS operations (op_id INT AUTO_INCREMENT PRIMARY KEY, op_name VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("operations table created");
    });

    // table of the questionnaire-operation relation
    sql = "CREATE TABLE IF NOT EXISTS questionnaire_op (op_id INT, questionnaire_id INT)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("questionnaire_op table created");
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

// ADD FUNCTIONS

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
function addVetToTeam(con, email, name){
    con.query("SELECT uid FROM accounts WHERE email = '" + email + "'", function (err, result){
        if (err) throw err;
        if (result.length != 0){
            var uid = JSON.parse(JSON.stringify(result[0]));
            var sql = "INSERT INTO sub_accounts (uid, name) VALUES (" + uid + ", " + name + ")";
            con.query(sql, function(err, result){
                if (err) throw err;
                console.log("Added " + name + " to account " + email)
            });
        }
        else {
            console.log("Failed"); // TODO: change
        }
    });
}

// add dog
// operation_date must be in format "yyyy-mm-dd"
function addDog(con, name, operation, target_area, operation_date, uid){
    con.query("SELECT target_id FROM target_area WHERE target_name = '" + target_area + "'", function (err, target_id_res, fields){
        if (err) throw err;
        var target_id = target_id_res[0].target_id;
        con.query("SELECT op_id FROM operations WHERE op_name = '" + operation  + "'", function (err, op_id_res, fields){
            var op_id = op_id_res[0].op_id;
            var sql_dog = "INSERT INTO dogs (name, op_id, target_area, operation_date) VALUES ?";
            var values = [[name, op_id, target_id, operation_date]];
            con.query(sql_dog, [values], function(err, dog_result){
                if (err) throw err;
                var sql_dog_user = "INSERT INTO dog_user (dog_id, uid) VALUES (" + dog_result.insertId + ", " + uid + ")";
                con.query(sql_dog_user, function(err, dog_user_result){
                    if (err) throw err;
                    console.log("Added dog user relationship.");
                });
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

// add dog-user relation
function addDogUserRelation(con, dog_id, uid){
    var sql = "INSERT INTO dog_user (dog_id, uid) VALUES (" + dog_id + ", " + uid + ")";
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log("Added connection to dog with id " + dog_id);
    });
}

// add survey
// TODO: need to complete - will also get list of users to send survey to here (it  needs to  be  done in one function)
function addSurvey(con, uid, creation_date, link, target_areas){
    var sql1 = "INSERT INTO survey (uid, created, link) VALUES (" + uid + ", " + creation_date + ", "  + link + ")";
    con.query(sql1, function(err, result){
        if (err) throw err;
        console.log("Added new survey.");
    });
    // insert into survey-target table (need to discuss how to handle target areas - is there a predetermined list?)
}

// add target_area
// TODO
function addTargetArea(con, target_area){
}

// add questionnaire
function addQuestionnaire(con, uid, creation_date, link, operation){
}

// add operation
function addOperation(con, operation){
}



// GET FUNCTIONS

// get user id from email
// if email not found, return -1
function getUserID(con, email, callback){
    var sql = "SELECT uid FROM accounts WHERE email='" + email + "'";
    con.query(sql, function(err, result){
        if (err) throw err;
        if (result.length == 0){ callback(-1); }
        else{
            var uid = JSON.parse(JSON.stringify(result[0])).uid;
            callback(uid);
        }
    });
}

// get user info
// if email not found, return null
function getUserInfo(con, email, callback){
    var sql = "SELECT * FROM accounts WHERE email='" + email + "'";
    con.query(sql, function(err, result){
        if (err) throw err;
        if (result.length == 0) {
            callback(null);
        }
        else {
            var user_info = JSON.parse(JSON.stringify(result[0]));
            if (user_info.type == 0){
                user_info.type = 'vet';
            }
            else {
                user_info.type = 'carer';
            }
            callback(user_info);
        }
    });
}

// get dogs of user (carer or vet team)
function getDogsOfUser(con, uid, callback){
    var sql = "SELECT dog_id FROM dog_user JOIN accounts WHERE dog_user.uid = accounts.uid"
    con.query(sql, function(err, result){
        if (err) throw err;
        if (result.length == 0) {
            callback(null);
        }
        else{
            var dog_list = JSON.parse(JSON.stringify(result));
            callback(dog_list);
        }
    });
}

// get user contacts - connections between carers and vets through dogs
function getUserContacts(con, email, callback){
}

// get list of all operations
function getOperations(con, callback){
}

// get operation info for a given operation (dog, carer, date, link)
function getOperationInfo(con, surgery, callback){
}

// get list of all target areas in system
function getTargetAreas(con, callback){
}


// TODO: update functions?
// TODO: delete functions



// TESTING
var connection = createConnection();
//clearDB(connection);
createTables(connection);
showTables(connection, function(result){
    console.log(result);
});
//addCarer(connection, 'test@example.com', 'test_pass', 'test');
getUserInfo(connection, 'test@example.com', function(result){
    console.log(result);
});
getUserID(connection, 'test@example.com', function(result){
    console.log(result);
});

//connection.query('INSERT INTO target_area (target_name) VALUES ("test target")', function(err, result){
//    if (err) throw err;
//    console.log("Added test target");
//});

//connection.query('INSERT INTO operations (op_name) VALUES ("test surgery")', function(err, result){
//    if (err) throw err;
//    console.log("Added test surgery");
//});
//
//addDog(connection, 'doggo', 'test surgery', 'test target', "2020-02-18", 1);
getDogsOfUser(connection, 1, function(result){
    console.log(result);
});