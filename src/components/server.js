const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
        first_letter_of_name: ,
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

        //The result should contain aid, name, sex, species, owner_id, bodyweight, op_id
        //Should we merge with accounts table?
        response_object = AnResult;
        response_object.first_letter_of_name = AnResult.name[0];

        //Each animal is associated with only one operation at present but for scalability, maybe separate (Animal, Op)
        //table?
        DB.getOperationInfo(connection,AnResult.op_id, function(OpResult){

            //The result should contain id, name, op_date, {LONG TEXT FIELDS - injury, surgery, procedure info},
            //location, stitches/staples, length of rest, cage/small room confinement, next appointment (DATETIME)
            response_object.op_name = opResult.op_name;
            response_object.op_date = opResult.op_date;
            response_object.body_condition = opResult.body_condition;

            //Potential problem with JSON parsing of TEXT fields??
            response_object.injury_info = opResult.injury;
            response_object.surgery_data = opResult.surgery;
            response_object.abnormalities = opResult.abnormalities;
            response_object.procedure_info = opResult.procedure_info;

            response_object.location = opResult.location;
            response_object.stitches_or_staples = opResult.stitch_staple;
            response_object.length_of_rest = opResult.rest_len;
            response_object.cage_or_room = opResult.cage_or_room;
            response_object.next_appt = opResult.next_appt;

            response_object.weeksAfterSurgery = dateDiffInWeeks(opResult.op_date, new Date());

            response_object.meds = JSON.parse(OpResult.meds);

        });

        delete response_object.op_id;

    }):
     */

    res.send(response_object);

});

app.get('/checkForQuestionnaires/:animalID', (req, res) => {
    console.log(req.body);
    res.send(
        {noOfQuestionnaires : 7, questionnaires: [{questionnaire_id : 1, link: 'link1'}]}
    );
    // TODO : DB.getQuestionnaires() which will give me a list of all the questionnaire rows
    /*
    DB.getAnimalInfo(connection, req.params.animalID, function(AnimalInfo){
        DB.getOperationInfo(connection, AnimalInfo.op_id, function(OpInfo){
            const op_date = OpInfo.op_date;
            DB.getQuestionnaires(connection, function(questionnaire_list){
                const arr = [];
                const c = 0;
                for (questionnaire in questionnaire_list){
                    if (dateDiffInWeeks(op_date, new Date()) == questionnaire.time){
                        arr.push({questionnaire_id : questionnaire.questionnaire_id, link: questionnaire.link});
                        c = c + 1;
                    }
                }
                res.send(
                    {noOfQuestionnaires : c, questionnaires : arr}
                );
            });
        });
    });
     */
});

app.get('/checkForSurveys/:animalID', (req, res) => {
    console.log(req.body);
    res.send(
        {noOfSurveys : 7, surveys: [{survey_id : 1, link: 'link1'}]}
    );
    /* TODO
    DB.getSurveysOfAnimal(connection, req.params.animalID, function(survey_list){
        // I will just send a list of links - alternatively we could include a 'done' field?
        const arr = [];
        const c = 0;
        for (survey in survey_list){
            arr.push({survey_id : survey.survey_id, link: survey.link});
            c = c + 1;
        }
        res.send(
            {noOfSurveys : c, surveys : arr}
        );
    });
     */
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

//Include a checkbox beside survey to indicate that the survey is done
app.post('/surveyComplete', (req, res) => {
    /*
    Send
    {
        aid: , //Animal ID
        surveyId: , //Survey ID
    }
     */
    console.log(req.body);
    /* // Should be in (survey_id, aid, done) - result is just string indicating 'success' or 'failure'
    DB.markSurveyDone(connection, req.body.survey_id, req.body.aid, function(result){
        res.send(result);
    });
     */
});

app.post('/addNewAnimal', (req, res) => {
    /*
    Here's what req.body should look like:
    {
        vetTeamID: ,
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
    DB.addOperation(connection, req.body.op_name, req.body.op_date, req.body.body_condition,
    req.body.injury_info, req.body.surgery_data, req.body.procedure_details, req.body.abnormalities,
    req.body.location, req.body.stitches_or_staples, req.body.length_of_rest, req.body.cage_or_room,
    req.body.next_appt, JSON.stringify(req.body.meds), function(OpIdResult){
        DB.addAnimal(connection, req.params.name, req.params.sex, req.params.species, req.params.bodyweight,
        req.body.owner_id, OpIdResult, function(AnIdResult){
            DB.addAnimalToVetTeam(connection, AnIdResult, req.body.vetTeamID);
            res.send({aid: AnIdResult});
        });
    });
     */
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.name}`,
    );
});

app.post('/modifyAnimal/:animalID', (req, res) => {
    /*
    Expecting same format as addAnimal
     */
    console.log(req.body);
    /*
    //TODO : DB.modifyAnimal
     */
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.next_appt}`,
    );
});

app.post('/addNewQuestionnaire', (req, res) => {
    /*
    Here's what req.body should look like:
    {
        vetTeamID: , //User ID of the vet team
        link: , //Link to the survey
        time_to_send: , //In no of weeks
    }
     */

    console.log(req.body);

    /*
    DB.addQuestionnaire(connection, req.body.time_to_send, req.body.link);
     */

    res.send(
        `I received your POST request. This is what you sent me: ${req.body.link}`,
    );
});

app.post('/addNewSurvey', (req, res) => {
    /*
    Here's what req.body should look like:
    {
        vetTeamID: , //User ID of the vet team
        link: , //Link to the survey
        location: , //Location being targeted
    }
     */

    console.log(req.body);

    /*
    DB.addSurvey(connection, req.body.vetTeamID, new Date(), req.body.link, req.body.location, function(AddResult){
    //Instead of a (survey_id, location) table, we need a (survey_id, aid) relation
        DB.getSurveyReceivers(connection, AddResult, function(animal_list){
            const arr = [];
            for (animal in animal_list){
                arr.push(animal.aid);
            }
            res.send(
                {animals : arr}
            );
        });
    });
     */

    res.send(
        `I received your POST request. This is what you sent me: ${req.body.link}`,
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
