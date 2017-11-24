import client from '../client'
import follow from '../follow'
import {myStore} from '../index'

const root = "/api/";

export const getAllFiles = () => {
    return dispatch => {
        return follow(client, root, [
            {rel: 'uploadedFiles', params: {size: myStore.getState().pageSize}}])
            .then(response => {
                dispatch(setFiles(response.entity._embedded.uploadedFiles));
                dispatch(setLinks(response.entity._links));
            })
    }
};

export const navigate = (link) => {
    return dispatch => {
        client({method: 'GET', path: link})
            .then(response => {
                dispatch(setFiles(response.entity._embedded.uploadedFiles));
                dispatch(setLinks(response.entity._links));
            })
    }
};

export const searchByString = (searchString) => {
    return dispatch => {
        client({
            method: 'get',
            path: root + '/uploadedFiles/search/findWithTags/' + searchString
        }).then(response => {
            dispatch(setFiles(response.entity.sort((item1, item2) => {
                return item1.name.localeCompare(item2.name)
            })));
            dispatch(setLinks([]));
        })
    }
}

const setFiles = (data) => {
    return {
        type: "SET_FILES",
        payload: data
    }
};

const setLinks = (data) => {
    return {
        type: "SET_LINKS",
        payload: data
    }
};


export const changePageSize = (data) => {
    return dispatch => {
        dispatch(setPageSize(data)).then(getAllFiles());
    }
};

const setPageSize = (data) => {
    return {
        type: "SET_PAGE_SIZE",
        payload: data
    }
};
