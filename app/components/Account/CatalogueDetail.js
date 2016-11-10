import React from 'react';
import { connect } from 'react-redux';

class CatalogueDetail extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="container">
                <div className="panel">
                    <div className="panel-body">
                        <h1>Catalogue Details</h1>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        messages: state.messages
    };
};

export default connect(mapStateToProps)(CatalogueDetail);