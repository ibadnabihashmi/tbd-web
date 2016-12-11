import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function login(email, password) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('http://localhost:3000/api/user/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            user: json.user
          });
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          cookie.save('user', json.user, { expires: moment().add(1, 'hour').toDate() });
          browserHistory.push(`/user/${json.user.username}`);
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function signup(name, username, email, password) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('http://localhost:3000/api/user/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, username: username, email: email, password: password })
    }).then((response) => {
      return response.json().then((json) => {
        if (response.ok) {
          dispatch({
            type: 'SIGNUP_SUCCESS',
            token: json.token,
            user: json.user
          });
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          cookie.save('user', json.user, { expires: moment().add(1, 'hour').toDate() });
          browserHistory.push(`/user/${json.user.username}`);
        } else {
          dispatch({
            type: 'SIGNUP_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        }
      });
    });
  };
}

export function logout() {
  cookie.remove('token');
  cookie.remove('user');
  browserHistory.push('/');
  return {
    type: 'LOGOUT_SUCCESS'
  };
}

export function forgotPassword(email) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/forgot', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'FORGOT_PASSWORD_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'FORGOT_PASSWORD_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function resetPassword(password, confirm, pathToken) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch(`/reset/${pathToken}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: password,
        confirm: confirm
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          browserHistory.push('/login');
          dispatch({
            type: 'RESET_PASSWORD_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'RESET_PASSWORD_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function deleteAccount(token) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/account', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch(logout());
          dispatch({
            type: 'DELETE_ACCOUNT_SUCCESS',
            messages: [json]
          });
        });
      }
    });
  };
}
