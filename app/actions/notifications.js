export function getNotifications(userId) {
  return (dispatch) => {
    dispatch({
      type:'CLEAR_MESSAGES'
    });
    return fetch(`http://localhost:3002/api/notification/get?userId=${userId}`,{
      method:'get',
      headers: { 'Content-Type':'application/json' }
    }).then((response) => {
      if(response.ok){
        return response.json();
      }else{
        return response.json();
      }
    })
  };
}

export function getUnreadNotifications(userId) {
  return (dispatch) => {
    dispatch({
      type:'CLEAR_MESSAGES'
    });
    return fetch(`http://localhost:3002/api/notification/getUnreadNotifications?userId=${userId}`,{
      method:'get',
      headers: { 'Content-Type':'application/json' }
    }).then((response) => {
      if(response.ok){
        response.json().then((json) => {
          dispatch({
            type: 'UPDATE_NOTIFICATIONS',
            notifications: json.notifications
          });
        });
      }else{
        dispatch({
          type: 'UPDATE_NOTIFICATIONS',
          notifications: ''
        });
      }
    })
  };
}

export function markNotificationRead(notificationId) {
  return ((dispatch) => {
    dispatch({
      type:'CLEAR_MESSAGES'
    });
    return fetch('http://localhost:3002/api/notification/markNotificationRead',{
      headers: {'Content-type':'Application/json'},
      method: 'post',
      body: JSON.stringify({
        notificationId: notificationId
      })
    }).then((response) => {
      if(response.ok){
        dispatch({
          type: 'DEC_NOTIFICATIONS',
          notifications: 1
        });
      }else{
        dispatch({
          type: 'DEC_NOTIFICATIONS',
          notifications: 0
        });
      }
      return;
    });
  })
}