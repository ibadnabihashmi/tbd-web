import request from 'superagent';

export function updateProfile(state, token) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch('http://localhost:3000/api/user/update', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: state.email,
                name: state.name,
                username: state.username,
                gender: state.gender,
                location: state.location,
                website: state.website,
                id:state.userId
            })
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: 'UPDATE_PROFILE_SUCCESS',
                        messages: [json]
                    });
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: 'UPDATE_PROFILE_FAILURE',
                        messages: Array.isArray(json) ? json : [json]
                    });
                });
            }
        });
    };
}

export function changePassword(password, confirm, userId, token) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch('http://localhost:3000/api/user/update', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                confirm: confirm,
                id:userId
            })
        }).then((response) => {
            if (response.ok) {
                return response.json().then((json) => {
                    dispatch({
                        type: 'CHANGE_PASSWORD_SUCCESS',
                        messages: [json]
                    });
                });
            } else {
                return response.json().then((json) => {
                    dispatch({
                        type: 'CHANGE_PASSWORD_FAILURE',
                        messages: Array.isArray(json) ? json : [json]
                    });
                });
            }
        });
    };
}

export function saveTag(tag,userId) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        return fetch('http://localhost:3000/api/preferences/addtag',{
            method:'post',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({
                userId:userId,
                tag:tag
            })
        }).then((response) => {
            if(response.ok){
                return response.json();
            }else{
                return response.json();
            }
        });
    }
}

export function updatePicture(image,userId) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        let upload = request.post('http://localhost:3000/api/user/updatePicture')
            .field('image', image)
            .field('userId', userId);

        upload.end((err, response) => {
            return response;
        });
    };
}

export function follow(user1,user2) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        fetch('http://localhost:3000/api/user/follow',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user1:user1,
                user2:user2
            })
        }).then((response) => {
            console.log(response.json());
        });
    }
}

export function unfollow(user1,user2) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        fetch('http://localhost:3000/api/user/unfollow',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user1:user1,
                user2:user2
            })
        }).then((response) => {
            console.log(response.json());
        });
    }
}