export function fetchFeed(userId, from, to) {
  return (dispatch) => {
    dispatch({
      type:'CLEAR_MESSAGES'
    });
    return fetch(`http://localhost:3000/api/user/fetchFeed?userId=${userId}&from=${from}&to=${to}`,{
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
