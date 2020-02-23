const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

//const DB = require('./DB.js');
//var connection = DB.createConnection();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Beginning of date helper function

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInWeeks(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor(Math.floor((utc2 - utc1) / _MS_PER_DAY)/7);
}

//end of date helper function (taken from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript)

app.get('/getAnimalInfo/:animalId', (req, res) => {

    const test = 'BAgni';
    const response_object = {ids: [1, 2, 3], name: req.params.animalId, text: 'Meow'};

    response_object.test_field = new Date();
    /*
    What response looks like:
    {
        name: ,
        firstLetterOfName: ,
        sex: ,
        species: ,
        bodyweight: , //this should be an integer (perhaps kg?)
        owner_name: , // VARCHAR
        op_name: , //VARCHAR - name of the operation
        op_date: , //DATE
        body_condition: , //INT (out of 9)
        injury_info: , //TEXT
        procedure_details: , //TEXT
        surgery_data: , //TEXT
        abnormalities: , //TEXT
        location: , //VARCHAR
        stitches_or_staples: , //BOOLEAN - true if stitches
        length_of_rest: , //INT - how many days rest?
        cage_or_room: , //BOOLEAN - true if cage
        next_appt: , //DATETIME
        meds: {
            name: ,
            amount: ,
            frequency: ,
            start: , //DATE??
            length_of_course:
        }
    }
     */

    /*
    DB.getAnimalInfo(connection,req.params.animalId, function(AnResult){

        //The result should contain id, name, sex, species, owner_id, bodyweight, op_id
        //Should we merge with accounts table?
        response_object = AnResult;
        response_object.firstLetterOfName = AnResult.name[0];

        //Each animal is associated with only one operation at present but for scalability, maybe separate (Animal, Op)
        //table?
        DB.getOperationInfo(connection,result.op_id, function(OpResult){

            //The result should contain id, name, op_date, {LONG TEXT FIELDS - injury, surgery, procedure info},
            //location, stitches/staples, length of rest, cage/small room confinement, next appointment (DATETIME)
            response_object.operationName = opResult.name;
            response_object.operationDate = opResult.op_date;

            //Potential problem with JSON parsing of TEXT fields??
            response_object.injury_info = opResult.injury;
            response_object.surgery_data = opResult.surgery;
            response_object.abnormalities = opResult.abnormalities;
            response_object.procedure_details = opResult.procedure;

            response_object.location = opResult.location;
            response_object.stitchesOrStaples = opResult.stitches_or_staples;
            response_object.lengthOfRest = opResult.length_of_rest;
            response_object.confinement = opResult.cage_or_small_room;
            response_object.nextAppt = opResult.next_appt;

            response_object.weeksAfterSurgery = dateDiffInWeeks(opResult.op_date, new Date());

        });

        delete response_object.op_id;

    }):
     */

    res.send(response_object);

});

app.get('/checkForQuestionnaires/:animalID', (req, res) => {
    console.log(req.body);
    res.send(
        {noOfQuestionnaires : 7}
    );
});

app.get('/getAnimals/:vetTeamID', (req, res) => {
    console.log(req.params.vetTeamID);
    res.send(
        {animals: [{id:1, name:'Meow'},{id:2, name:'Woof'}]}
    );
    //Change original function to include animal's name as well
    /*
    DB.getAnimalsOfVetTeam(connection, req.body.vetTeamID, function(result){
        res.send(result);
    });
     */
});

app.get('/getListOfVets/:vetTeamID', (req, res) => {
    console.log(req.body);
    res.send(
        {vets : ['Tom','Agni']}
    );
    /*
    DB.getVetList(connection, req.body.vetTeamID, function(result){
        // for each element in list of vets, send names
        const arr = [];
        for (vet in result){
            arr.push(vet.name);
        }
        res.send(
            {vets : arr}
        );
    });
    */
});

app.post('/addNewAnimal', (req, res) => {
    /*
    Here's what req.body should look like:
    {
        name: ,
        sex: ,
        species: ,
        bodyweight: , //this should be an integer (perhaps kg?)
        owner_id: , // INT
        op_name: , //VARCHAR - name of the operation
        op_date: , //DATE
        body_condition: , //INT (out of 9)
        injury_info: , //TEXT
        procedure_details: , //TEXT
        surgery_data: , //TEXT
        abnormalities: , //TEXT
        location: , //VARCHAR
        stitches_or_staples: , //BOOLEAN - true if stitches
        length_of_rest: , //INT - how many days rest?
        cage_or_room: , //BOOLEAN - true if cage
        next_appt: , //DATETIME
        meds: {
            name: ,
            amount: ,
            frequency: ,
            start: , //DATE??
            length_of_course:
        }
    }
     */
    console.log(req.body);
    /*
    // This function needs to return the op_id
    DB.addOperation(connection, req.params.op_name, req.params.op_date, req.params.body_condition,
    req.params.injury_info, req.params.surgery_data, req.params.procedure_details, req.params.abnormalities,
    req.params.location, req.params.stitches_or_staples, req.params.length_of_rest, req.params.cage_or_room,
    req.params.next_appointment, JSON.stringify(req.params.meds), function(OpIdResult){
        DB.addAnimal(connection, req.params.name, req.params.sex, req.params.species, req.params.bodyweight,
        req.params.owner_id, OpIdResult, function(AnIdResult){
            res.send({aid: AnIdResult});
        });
    });
     */
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});

app.post('/modifyAnimal/:animalID', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});

app.post('/addNewQuestionnaire', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});

app.post('/addNewSurvey', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});

app.post('/registerUser', (req, res) => {
    //Username, password, email
    console.log(req.body);
    res.send(
        {uid:7, status: 'success'},
    );
    /*
    DB.addCarer(connection, req.body.email, req.body.password, req.body.username);
    DB.getUserID(connection, req.body.email, function(result){
        const response_status = (result==-1) ? 'failure' : 'success';
        res.send(
        {uid:result, status: response_status},
        );
    ;});
     */
});

app.post('/loginData', (req, res) => {
    //This method expects the username and password
    console.log(req.body);
    res.send({passwordCorrect: true});
    /*
    DB.authenticateUser(connection, req.body.username, req.body.password, function(result){res.send(
        JSON.stringify({passwordCorrect: result}),
    );});
    */
});

app.listen(port, () => console.log(`Listening on port ${port}`));
