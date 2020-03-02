# Remote Animal Recovery Monitoring

## Brief
Like humans, dogs often suffer from injuries and joint problems but, unlike humans, there is no data resource to monitor postoperative recovery in small animals. Your task is to create a mobile phone app enabling dog carers to monitor progress of their dogs during recovery after orthopaedic surgery, provide information on what to expect, and connect them with their consultant. You will work with a leading veterinary orthopaedic surgeon specialising in treatment of these conditions, with the potential to significantly improve the quality of life for many animals with this new form of remote patient support.

## Core Features
- Ability to login (Tom)
- CMS (Agni)
- Chat client - supports images and videos (Andreea)
- Verified questionnares
- Sending out feedback surveys
- Discharge information
- Outcome questionnaires
- Exporting to excel & pdf (Masha)
- Database (Masha)
- Front end (Archie & Dominic)

## Setup
Clone the git repository. To use the app a MySQL server needs to be installed and a database set up. Once the server has been set up change into the created directory and enter the following into a terminal:

1. `yarn install`
2. Then ensure the API is running: `node src/components/server.js`
3. Finally, start the app: `yarn start`

You can then access the app at [localhost:8080](http://localhost:8080)

## Implementation Details
- This app is built and expanded from [react-pwa-boilerplate](https://github.com/ragingwind/react-pwa-boilerplate)
- For front-end we are using React with Material-UI as our theme and documentation can be found [here](https://v0.material-ui.com/#/components).
- For back-end we are using Express, Node.js and SQL. The server currently runs on [localhost:5000](http://localhost:5000). For this to be used in production, the server needs to be hosted somewhere - replace all instances of "http://localhost:5000" with the relevant domain name. 
