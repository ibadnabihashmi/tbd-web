import request from 'superagent';

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

export function updateCatalogue(data) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        return request
            .post('http://localhost:3000/api/catalogue/update')
            .field('files',data.catalogueImages)
            .send({
                catDesc:data.catalogueDesc,
                catPrice:data.cataloguePrice,
                catTags:data.catalogueTags,
                catName:data.catalogueName,
                catId:data.catalogueId,
                userId:data.userId
            }).end((res) => {
                return res;
            });
    };
}