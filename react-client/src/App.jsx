import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <h1> yooooo </h1>
                <Button variant="raised" color="primary">
                    Hello World
                    </Button>
            </div>

        )
    }
}

export default App;