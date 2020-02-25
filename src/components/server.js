// Agni's file
// Will be properly implemented at some point
// Just a structure to test with :)

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

app.get('/getListOfVets/:vetTeamID', (req, res) => {
  console.log(req.body);
  res.send({
    vets: ['Tom','Agni']
  });
  /*
  DB.getVetList(connection, req.body.vetTeamID, function(result){
    // for each element in list of vets, send names
    const arr = [];
    for (vet in result) {
      arr.push(vet.name);
    }
    res.send({
      vets: arr
    });
  });
  */
});

app.post('/registerUser', (req, res) => {
  //Username, password, email
  console.log(req.body);
  res.send({
    uid: 7,
    status: 'success'
  });
  /*
  DB.addCarer(connection, req.body.email, req.body.password, req.body.username);
  DB.getUserID(connection, req.body.email, function(result) {
    const response_status = (result==-1) ? 'failure' : 'success';
    res.send({
      uid: result,
      status: response_status
    });
  });
  */
});

app.post('/loginData', (req, res) => {
  //This method expects the username and password
  console.log(req.body);
  res.send({passwordCorrect: req.body.username == "t"});
  /*
  DB.authenticateUser(connection, req.body.username, req.body.password, function(result) {
    res.send(JSON.stringify({
      passwordCorrect: result
    }));
  });
  */
});

app.listen(port, () => console.log(`Listening on port ${port}`));




/*
const response = await fetch('http://localhost:5000/addNewAnimal', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },

  //Maybe have some state to store the required fields
  body: JSON.stringify({'textTest' : 'Hey'})
});

const body = await response.text();


^^ or .json

only change url or {'testTest'} bit





const response = await fetch('http://localhost:5000/registerUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    //Maybe have some state to store the required fields
    body: JSON.stringify({'username' : 'Test1', 'password':'Test1Password','email':'something'})
});
const body = await response.json();


const response = await fetch('http://localhost:5000/getListOfVets/123');
const body = await response.json();


*/
