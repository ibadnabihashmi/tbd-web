const initialState = {
  token: null,
  user: {},
  notifications: ''
};

export default function auth(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'OAUTH_SUCCESS':
    case 'USERNAME_CHANGE_SUCCESSFULL':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      });
    case 'UPDATE_NOTIFICATIONS':
      state.notifications = action.notifications;
      return state;
    case 'DEC_NOTIFICATIONS':
      state.notifications = String(Number(state.notifications) - action.notifications <= 0 ? 0 : Number(state.notifications) - action.notifications);
      return state;
    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}
