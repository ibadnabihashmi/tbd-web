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
