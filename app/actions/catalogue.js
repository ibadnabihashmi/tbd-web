import request from 'superagent';
import { browserHistory } from 'react-router';

export function saveCatalogue(data) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        let upload = request.post('http://localhost:3000/api/catalogue/create')
            .field('files', data.image1)
            .field('files', data.image2)
            .field('files', data.image3)
            .field('files', data.image4)
            .field('catalogueName',data.catalogueName)
            .field('cataloguePrice',data.cataloguePrice)
            .field('catalogueDesc',data.catalogueDesc)
            .field('image1tags',data.image1tags)
            .field('image1caption',data.image1caption)
            .field('image2tags',data.image2tags)
            .field('image2caption',data.image2caption)
            .field('image3tags',data.image3tags)
            .field('image3caption',data.image3caption)
            .field('image4tags',data.image4tags)
            .field('image4caption',data.image4caption)
            .field('userId',data.userId);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.ok) {
                browserHistory.push('/getCatalogue/'+response.body.catalogueId);
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

export function fetchCatalogueDetails(catalogueId) {
    return (dispatch) => {
        dispatch({
            type:'CLEAR_MESSAGES'
        });
        return fetch('http://localhost:3000/api/catalogue/get/'+catalogueId,{
            method:'get',
            headers:{ 'Content-type':'application/json' }
        }).then((response) => {
            if(response.ok){
                return response.json();
            }else{
                return response.json();
            }
        });
    };
}