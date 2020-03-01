const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const DB = require('./DB.js');
const connection = DB.createConnection();

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

    //const test = 'BAgni';
    //const response_object = {ids: [1, 2, 3], name: req.params.animalId, text: 'Meow'};
    var response_object = {};

    //response_object.test_field = new Date();
    /*
    What response looks like:
    {
        name: ,
        first_letter_of_name: ,
        sex: ,
        species: ,
        bodyweight: , //this should be an integer (perhaps kg?)
        owner_id: , //Name of the owner
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
        weeks_after_surgery: , //INT
        meds_name: ,
        meds_amount: ,
        meds_frequency: ,
        meds_start: , //DATE??
        meds_length_of_course:
    }
     */

    try{
        DB.getAnimalInfo(connection,req.params.animalId, function(AnResult){

            //The result should contain aid, name, sex, species, owner_id, bodyweight, op_id
            //Should we merge with accounts table?
            if (AnResult == null){
                res.send({status:'failure'});
            } else{
                response_object = AnResult;
                response_object.status = 'success';
                response_object.first_letter_of_name = AnResult.name[0];

                //Each animal is associated with only one operation at present but for scalability, maybe separate (Animal, Op)
                //table?
                DB.getOperationInfo(connection,AnResult.op_id, function(opResult){

                    DB.getUserInfo(connection,AnResult.owner_id,function(usResult) {

                        //The result should contain id, name, op_date, {LONG TEXT FIELDS - injury, surgery, procedure info},
                        //location, stitches/staples, length of rest, cage/small room confinement, next appointment (DATETIME)
                        response_object.owner_id = AnResult.owner_id;
                        response_object.owner_name = usResult.name;

                        response_object.op_name = opResult.op_name;
                        response_object.op_date = new Date(opResult.op_date);
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
                        response_object.next_appt = opResult.next_appointment;
                        console.log("next_appt: " + opResult.next_appointment);

                        response_object.weeks_after_surgery = dateDiffInWeeks(new Date(opResult.op_date), new Date());

                        opResult.meds = JSON.parse(opResult.meds);

                        response_object.meds_name = opResult.meds.name;
                        response_object.meds_amount = opResult.meds.amount;
                        response_object.meds_frequency = opResult.meds.frequency;
                        response_object.meds_start = opResult.meds.start;
                        response_object.meds_length_of_course = opResult.meds.length_of_course;


                        delete response_object.op_id;
                        res.send(response_object);

                    });

                });
            }
        });
    }
    catch(err){
        res.send({status: "failure"});
    }

});

app.get('/checkForQuestionnaires/:animalID', (req, res) => {
    console.log(req.body);

    try{
        DB.getAnimalInfo(connection, req.params.animalID, function(AnimalInfo){
            if (AnimalInfo == null){
                res.send({noOfQuestionnaires : 0, questionnaires : [], status: 'failure'});
            }
            else{
                DB.getOperationInfo(connection, AnimalInfo.op_id, function(OpInfo){
                    const op_date = OpInfo.op_date;
                    DB.getQuestionnaires(connection, function(questionnaire_list){
                        const arr = [];
                        var c = 0;
                        const dateDiff = dateDiffInWeeks(new Date(op_date), new Date());
                        for (i = 0; i < questionnaire_list.length; i++){
                            var questionnaire = questionnaire_list[i];
                            if (dateDiff >= questionnaire.time){
                                arr.push({questionnaire_id : questionnaire.questionnaire_id, link: questionnaire.link,
                                    name:questionnaire.name });
                                c = c + 1;
                            }
                        }
                        res.send(
                            {noOfQuestionnaires : c, questionnaires : arr, status: 'success'}
                        );
                    });
                });
            }
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

});

app.get('/checkForSurveys/:animalID', (req, res) => {
    console.log(req.body);

    try{
        DB.getSurveysOfAnimal(connection, req.params.animalID, function(survey_list){
            if (survey_list == null){
                res.send(
                    {noOfSurveys : 0, surveys : [], status: 'failure'}
                );
            }
            else{
                const arr = [];
                for (i=0; i < survey_list.length; i++){
                    arr.push({survey_id : survey_list[i].survey_id, done : survey_list[i].done, link: survey_list[i].link});
                }
                res.send(
                    {noOfSurveys : survey_list.length, surveys : arr, status: 'success'}
                );
            }
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

});

//Returns a list like [{aid: , name: },{aid: , name: }, ...] - in future if no vetTeamID return failure
app.get('/getAnimals/:vetTeamID', (req, res) => {
    console.log(req.params.vetTeamID);

    try{
        DB.getAnimalsOfVetTeam(connection, req.params.vetTeamID, function(result){
            res.send({animals: result, status:'success'});
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

});

//Returns a list like [{aid: , name: },{aid: , name: }, ...] - in future if no vetTeamID return failure
app.get('/getUsers', (req, res) => {
    console.log(req.params.vetTeamID);

    try{
        DB.getCarerList(connection, function(result){
            res.send({users: result, status:'success'});
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

});

//List like ['vet1', 'vet2', ...] - in future if no vetTeamID return failure
app.get('/getListOfVets/:vetTeamID', (req, res) => {
    console.log(req.body);

    try{
        DB.getVetList(connection, req.params.vetTeamID, function(result){
            // for each element in list of vets, send names
            console.log(result);
            var arr = [];
            for (i = 0; i < result.length; i++){
                arr.push(result[i].name);
            }
            res.send(
                {vets : arr, status: 'success'}
            );
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

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

    try{
        DB.completeSurvey(connection, req.body.aid, req.body.surveyId, function(result){
            res.send(result);
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

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
        owner_id: , // INT - send the  user id as well
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
        meds_name: ,
        meds_amount: ,
        meds_frequency: ,
        meds_start: , //DATE??
        meds_length_of_course:
    }
    var req = { body: {
        vetTeamID: 2,
        name: "George",
        sex: "m",
        species: "Dog",
        bodyweight: 30, //this should be an integer (perhaps kg?)
        owner_id: "Albert", // VARCHAR
        op_name: "Leg", //VARCHAR - name of the operation
        op_date: "2020-01-11", //DATE
        body_condition: 7, //INT (out of 9)
        injury_info: "Surgery on that leg tho", //TEXT
        procedure_details: "stuff n nonsense", //TEXT
        surgery_data: "weeee", //TEXT
        abnormalities: "none", //TEXT
        location: "leg", //VARCHAR
        stitches_or_staples: true, //BOOLEAN - true if stitches
        length_of_rest: 35, //INT - how many days rest?
        cage_or_room: false, //BOOLEAN - true if cage
        next_appt: new Date(), //DATETIME
        meds_name: "MED",
        meds_amount: "3",
        meds_frequency: "2",
        meds_start: "2020-01-23", //DATE??
        meds_length_of_course: "14",
    }};*/

    console.log(req.body);

    meds = JSON.stringify({name:req.body.meds_name, amount:req.body.meds_amount, frequency: req.body.meds_frequency,
        start: req.body.meds_start, length_of_course: req.body.meds_length_of_course});

    try{
        DB.addOperation(connection, req.body.op_name, req.body.op_date, req.body.body_condition,
            req.body.injury_info, req.body.surgery_data, req.body.procedure_details, req.body.abnormalities,
            req.body.location, req.body.stitches_or_staples, req.body.length_of_rest, req.body.cage_or_room,
            req.body.next_appt, meds, function(OpIdResult){
                console.log(OpIdResult);
                DB.addAnimal(connection, req.body.name, req.body.sex, req.body.species, req.body.bodyweight,
                    req.body.owner_id, OpIdResult, function(AnIdResult){
                        DB.addAnimalToVetTeam(connection, AnIdResult, req.body.vetTeamID);
                        res.send({aid: AnIdResult, status: 'success'});
                    });
            });

    } catch(err){
        res.send({aid: -1, status: 'failure'});
    }


});

app.post('/modifyAnimal/:animalID', (req, res) => {
    /*
    Expecting same format as addAnimal - no need to send owner_id/op_id
     */

    /*var req = { body: {
            vetTeamID: 2,
            name: "meow",
            sex: "m",
            species: "Dog",
            bodyweight: 30, //this should be an integer (perhaps kg?)
            //owner_id: "Albert", // VARCHAR
            op_name: "Leg", //VARCHAR - name of the operation
            op_date: "2020-01-11", //DATE
            body_condition: 7, //INT (out of 9)
            injury_info: "Surgery on that leg tho", //TEXT
            procedure_details: "stuff n nonsense", //TEXT
            surgery_data: "weeee", //TEXT
            abnormalities: "none", //TEXT
            location: "leg", //VARCHAR
            stitches_or_staples: true, //BOOLEAN - true if stitches
            length_of_rest: 35, //INT - how many days rest?
            cage_or_room: false, //BOOLEAN - true if cage
            next_appt: new Date().toISOString().slice(0, 19).replace('T', ' '), //DATETIME
            meds_name: "MED",
            meds_amount: "3",
            meds_frequency: "2",
            meds_start: "2020-01-23", //DATE??
            meds_length_of_course: "14",
        }};*/

    //console.log(req.body);
    try{
        meds = JSON.stringify({name:req.body.meds_name, amount:req.body.meds_amount, frequency: req.body.meds_frequency,
            start: req.body.meds_start, length_of_course: req.body.meds_length_of_course});
        DB.getAnimalInfo(connection,req.params.animalID, function(AnResult){
            if(AnResult==null){
                res.send({status: 'failure'});
            } else {
                DB.updateAnimal(connection, req.params.animalID, req.body.name, req.body.sex, req.body.species, req.body.bodyweight,
                    AnResult.owner_id, AnResult.op_id, function(){
                        DB.updateOperation(connection, AnResult.op_id, req.body.op_name, req.body.op_date, req.body.body_condition,
                            req.body.injury_info, req.body.surgery_data, req.body.procedure_details, req.body.abnormalities,
                            req.body.location, req.body.stitches_or_staples, req.body.length_of_rest, req.body.cage_or_room,
                            req.body.next_appt, meds, function(){
                                res.send({'status' : 'success'})
                            });
                    });
            }
        });
    }catch(err){
        console.log(err);
        res.send({'status' : 'failure'})
    }
});

app.post('/addNewQuestionnaire', (req, res) => {
    /*
    Here's what req.body should look like:
    {
        vetTeamID: , //User ID of the vet team
        link: , //Link to the survey
        time_to_send: , //In no of weeks
        name: , //Name of questionnaire
    }
     */

    console.log(req.body);
    try{
        DB.addQuestionnaire(connection, req.body.time_to_send, req.body.link, req.body.name, function(result){
            if (result != -1){
                res.send({qid: result, status: 'success'});
            }
            else{
                res.send({qid: -1, status: 'failure'});
            }
        });
    }catch(err){
        res.send({qid: -1, status: 'failure'});
    }
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

    try{
        DB.addSurvey(connection, req.body.vetTeamID, new Date().toISOString().slice(0,10), req.body.link, req.body.location, function(AddResult){
            //Instead of a (survey_id, location) table, we need a (survey_id, aid) relation
            DB.getSurveyReceivers(connection, AddResult, function(animal_list){
                const arr = [];
                for (i=0; i<animal_list.length; i++){
                    arr.push(animal_list[i].aid);
                }
                res.send(
                    {animals : arr, status: 'success'}
                );
            });
        });
    } catch(err){
        res.send({animals : [], status: 'failure'});
    }

});

app.post('/registerUser', (req, res) => {
    //Username, password, email
    console.log(req.body);
    try{
        DB.addCarer(connection, req.body.email, req.body.password, req.body.username, function(add_result){
            if (add_result != -1){
                res.send({uid: add_result, status: 'success'});
            }
            else{
                res.send({uid: -1, status: 'failure'});
            }
        });
    }catch(err){
        res.send({uid: -1, status: 'failure'});
    }
});

app.post('/registerVetTeam', (req, res) => {
    //Username, password, email
    console.log(req.body);
    try{
        DB.addVetTeam(connection, req.body.email, req.body.password, req.body.username, function(add_result){
            if (add_result != -1){
                res.send({vid: add_result, status: 'success'});
            }
            else{
                res.send({vid: -1, status: 'failure'});
            }
        });
    }catch(err){
        res.send({vid: -1, status: 'failure'});
    }
});

app.post('/addVetToTeam/:vetTeamID', (req, res) =>{

    try{
        DB.addVetToTeam(connection, req.params.vetTeamID, req.body.name, function(add_result){
            res.send(add_result);
        });
    }
    catch(err){
        res.send({status: 'failure'});
    }

});

app.post('/loginData', (req, res) => {
    //This method expects the email and password
    console.log(req.body);
    //res.send({passwordCorrect: true});

    try{
        DB.authenticateUser(connection, req.body.email, req.body.password, function(result){
            var type = (result.type == 1)? 'carer' : 'vet';
            res.send({passwordCorrect: result.status, uid: result.uid, aid: result.aid, name: result.name, status: 'success', VetOrCarer : type});
        });
    }catch(err){
        res.send({passwordCorrect: false, status: 'failure'});
    }

});

app.listen(port, () => console.log(`Listening on port ${port}`));
