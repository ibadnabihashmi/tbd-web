import React from 'react';
import Header from './Header';
import Footer from './Footer';
import request from 'superagent';

class App extends React.Component {
    constructor(props){
        super(props);
        request
            .get('http://localhost:3000/api/user/checkAuth')
            .end((err,response) => {
                if(err){
                    this.props.dispatch({
                        type: 'NO_USER',
                        token: undefined,
                        user: undefined
                    });
                    console.log(err);
                }else{
                    console.log(response);
                }
            });
    }
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default App;
