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

    var test = 'BAgni';
    var response_object = { ids: [1,2,3], name: req.params.animalId, text: 'Meow'};

    response_object.test_field = new Date();

    /*
    DB.getAnimalInfo(connection,req.params.animalId, function(AnResult){

        //The result should contain id, name, sex, species, owner_name, body_weight, op_id
        //Should we merge with accounts table?
        response_object = AnResult;
        response_object.firstLetterOfName = AnResult.name[0];

        //Each animal is associated with only one operation at present but for scalability, maybe separate (Animal, Op)
         table?
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

app.post('/addNewAnimal', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});

app.post('/registerUser', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});

app.post('/loginData', (req, res) => {
    //This method expects the email ID and password
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.textTest}`,
    );
});



app.listen(port, () => console.log(`Listening on port ${port}`));
