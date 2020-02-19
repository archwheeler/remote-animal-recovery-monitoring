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
    sql = "CREATE TABLE IF NOT EXISTS sub_accounts (uid INT, name VARCHAR(255), FOREIGN KEY (uid) REFERENCES accounts(uid))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Sub-account table created");
    });

    // table of operations
    sql = "CREATE TABLE IF NOT EXISTS operations (op_id INT AUTO_INCREMENT PRIMARY KEY, op_name VARCHAR(255), op_date DATE, body_condition INT, injury TEXT, surgery TEXT, procedure_info TEXT, abnormalities TEXT, location VARCHAR(255), stitch_staple BOOLEAN, rest_len INT, cage_or_room BOOLEAN, next_appointment DATETIME, meds TEXT)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("operations table created");
    });

    // animal table
    sql = "CREATE TABLE IF NOT EXISTS animals (aid INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), sex VARCHAR(1), species VARCHAR(255), bodyweight INT, owner_id INT, op_id INT, FOREIGN KEY (owner_id) REFERENCES accounts(uid), FOREIGN KEY (op_id) REFERENCES operations(op_id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Animal table created");
    });

    // dog-user relation table
    sql = "CREATE TABLE IF NOT EXISTS animal_vet (aid INT, uid INT, FOREIGN KEY(aid) REFERENCES animals(aid), FOREIGN KEY (uid) REFERENCES accounts(uid))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Animal-user relation table created");
    });

    // survey info table
    sql = "CREATE TABLE IF NOT EXISTS survey (survey_id INT AUTO_INCREMENT PRIMARY KEY, uid INT, created DATE, link VARCHAR(255), FOREIGN KEY (uid) REFERENCES accounts(uid))";
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

    // table of questionnaires
    sql = "CREATE TABLE IF NOT EXISTS questionnaires (questionnaire_id INT AUTO_INCREMENT PRIMARY KEY, uid INT, created DATE, link VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("questionnaires table created");
    });

    // table of the questionnaire-operation relation
    sql = "CREATE TABLE IF NOT EXISTS questionnaire_op (op_id INT, questionnaire_id INT)"; // TODO: foreign key this
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
    con.query("DROP DATABASE app", function(err, result){
        if (err) throw err;
        con.query("CREATE DATABASE app", function (err, result) {
            if (err) throw err;
            console.log("Database cleared.");
        });
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
            var uid = JSON.parse(JSON.stringify(result[0])).uid;
            var sql = "INSERT INTO sub_accounts (uid, name) VALUES (" + uid + ", '" + name + "')";
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

// add animal
// arguments: connection, name:string, sex:string(f/m), species:string, bodyweight:int, owner_id:int, op_id:int)
function addAnimal(con, name, sex, species, bodyweight, owner_id, op_id){
    var sql = "INSERT INTO animals (name, sex, species, bodyweight, owner_id, op_id) VALUES ?";
    values =  [[name, sex, species, bodyweight, owner_id, op_id]];
    con.query(sql, [values], function(err, result){
        if (err) throw err;
        console.log("Added animal " + result.insertId);
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

// add animal to vet team
function addAnimalToVetTeam(con, aid, uid){
    // first check that uid is a vet
    var sql1 = "SELECT type FROM accounts WHERE uid=" + uid;
    con.query(sql1, function(err, result){
        if (err) throw err;
        var type = JSON.parse(JSON.stringify(result[0])).type;
        if (type){
            console.log("This is a carer, not vet - aborting.")
        }
        else{
            var sql2 = "INSERT INTO animal_vet (aid, uid) VALUES (" + aid + ", "  + uid + ")";
            con.query(sql2, function(err, result){
                if (err) throw err;
                console.log("Added animal-vet relation.");
            });
        }
    });
}

// add survey
// TODO: need to complete - will also get list of users to send survey to here (it  needs to  be  done in one function)
function addSurveyGetReceivers(con, uid, creation_date, link, target_areas){
    var sql1 = "INSERT INTO survey (uid, created, link) VALUES (" + uid + ", " + creation_date + ", "  + link + ")";
    con.query(sql1, function(err, result){
        if (err) throw err;
        console.log("Added new survey.");
    });

}

// add questionnaire
function addQuestionnaire(con, uid, creation_date, link, operation){
}

// add operation
function addOperation(con, op_name, op_date, condition, injury_text, surgery_text, procedure_text, abnormalities, location, stitch_staple, rest_len, cage_or_room, next_appointment, meds){
    var sql = "INSERT INTO operations (op_name, op_date, body_condition, injury, surgery, procedure_info, abnormalities, location, stitch_staple, rest_len, cage_or_room, next_appointment, meds) VALUES ?";
    var values = [[op_name, op_date, condition, injury_text, surgery_text, procedure_text, abnormalities, location, stitch_staple, rest_len, cage_or_room, next_appointment, meds]];
    con.query(sql, [values], function(err, result){
        if (err) throw err;
        console.log('Added operation ' + result.insertId);
    });
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
function getUserInfo(con, uid, callback){
    var sql = "SELECT * FROM accounts WHERE uid='" + uid + "'";
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

// get animal info
function getAnimalInfo(con, aid, callback){
    var sql = "SELECT * FROM animals WHERE aid='" + aid + "'";
    con.query(sql, function(err, result){
        if (err) throw err;
        if (result.length == 0){
            callback(null);
        }
        else{
            var animal_info = JSON.parse(JSON.stringify(result[0]));
            callback(animal_info);
        }
    });
}

// get animals of vet team
function getAnimalsOfVetTeam(con, uid, callback){
    var sql = "SELECT aid FROM animal_vet JOIN accounts WHERE animal_vet.uid = accounts.uid AND animal_vet.uid =" + uid;
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
function getUserContacts(con, uid, callback){
}

// get list of all operations
function getOperations(con, callback){
}

// get operation info for a given operation (dog, carer, date, link)
function getOperationInfo(con, surgery, callback){
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
//addVetTeam(connection, 'vet@example.com', 'test_pass', 'test_vet_team');
//addVetToTeam(connection, 'vet@example.com', 'vet1');
//addVetToTeam(connection, 'vet@example.com', 'vet2');

var today = new Date().toISOString().slice(0, 10);
//addOperation(connection, 'test_op', today, 6, 'injury_text', 'surgery_text', 'prcedure_text', 'abnormalities_text', 'test_loc', false, 3, false, new Date(), 'some_JSON');
//addAnimal(connection, 'doggo', 'f', 'dog', 20, 1, 1);
addAnimalToVetTeam(connection, 4, 1);

getUserInfo(connection, 2, function(result){
    console.log(result);
});
getUserID(connection, 'test@example.com', function(result){
    console.log(result);
});

getAnimalInfo(connection, 4, function(result){
    console.log(result);
});

getAnimalsOfVetTeam(connection, 2, function(result){
    console.log(result);
});