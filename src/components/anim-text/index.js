import React from 'react';
import Button from 'antd/lib/button';

class AnimText extends React.Component{
    state = {
        show: true
    };

    onClick = () => {
        this.setState({
            show: !this.state.show
        });
    };
    render(){
        return (
            <div className="texty-demo" style={{ marginTop: 16 }}>
            </div>
        );
    }
}

export default AnimText