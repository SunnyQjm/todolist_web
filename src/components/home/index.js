import React from 'react'
import {
    withRouter
} from 'react-router-dom';

class HomeComponent extends React.Component{
    render() {
        return (
            <div>
                Home
            </div>
        );
    }
}

export default withRouter(HomeComponent)