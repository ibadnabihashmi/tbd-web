export function saveCatalogue(name,description,id) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_MESSAGES'
        });
        return fetch('http://localhost:3000/api/catalogue/create', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description,
                id:id
            })
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json();
            }
        });
    };
}

export function fetchUserCatalogues(userId) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        return fetch('http://localhost:3000/api/catalogue/fetchUserCatalogues?userId='+userId,{
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