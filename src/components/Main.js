import React from 'react';
import {Card, CardHeader, CardText, Banner} from 'material-ui/Card';

class Main extends React.Component {

    state = {
        response: '',
        responseToPost: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.animals }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:5000/getAnimals/123');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    handleClick = async e => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //Maybe have some state to store the required fields
            body: JSON.stringify({'username' : 'Test1', 'password':'Test1Password','email':'something'})
        });
        const body = await response.json();

        this.setState({ responseToPost: body.uid });
    };

    render() {
        return (
            <div>
                <Card>
                    <CardHeader><a href="/DogInformation">Dog Information</a></CardHeader>
                </Card>
                <Card>
                    <CardHeader>{this.state.response}</CardHeader>
                </Card>
                <Card>
                    <CardHeader>{this.state.responseToPost}</CardHeader>
                </Card>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}

export default Main;
