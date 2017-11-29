import client from '../client'
import follow from '../follow'
import myStore from '../store'
import fileDownload from 'js-file-download'

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
        return client({method: 'GET', path: link})
            .then(response => {
                dispatch(setFiles(response.entity._embedded.uploadedFiles));
                dispatch(setLinks(response.entity._links));
            })
    }
};

const setMsg = (error, msg) => {
    return {
        type: "SET_MSG",
        payload: {error: error, msg: msg}
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

const setFiles = (files) => {
    return {
        type: "SET_FILES",
        payload: files
    }
};

const setLinks = (links) => {
    return {
        type: "SET_LINKS",
        payload: links
    }
};


export const changePageSize = (pageSize) => {
    return dispatch => {
        dispatch(setPageSize(pageSize))
        dispatch(getAllFiles());
    }
};

const setPageSize = (pageSize) => {
    return {
        type: "SET_PAGE_SIZE",
        payload: pageSize
    }
};

export const uploadFile = (data) => {
    return dispatch => {
        return fetch(root + "/uploadedFiles/upload", {
            mode: "cors",
            body: data,
            method: "post",
            headers: myStore.getState().authHeader
        }).then(dispatch(getAllFiles()));
    }
};

export const loadComments = (data) => {
    return dispatch => {
        return client({
            method: 'GET',
            path: "api/comments/search/findByTarget?target=" + data
        }).then(response => {
            return response.entity._embedded.comments
        })
    }
};

export const deleteFile = (data) => {
    return dispatch => {
        return fetch("api/uploadedFiles/delete/" + data, {
            method: "delete",
            mode: "cors",
            headers: myStore.getState().authHeader
        }).then(() => dispatch(getAllFiles()))
    }
};

export const uploadComment = (data) => {
    return dispatch => {
        return fetch("api/comments/comment", {
            mode: 'cors',
            body: data,
            method: 'post',
            headers: myStore.getState().authHeader
        }).then(() => dispatch(getAllFiles()))
    }
};

const checkResponseStatusAndThrow = (response) => {
    if (response.status !== 200)
        throw Promise.resolve(response.text());
};

const catchErrorAndDispatchMsg = (dispatch, error) => {
    console.log("catch!");
    error.then((err) => dispatch(setMsg(true, err)));
}

export const downloadFile = (fileName) => {
    return dispatch => {
        return fetch("api/uploadedFiles/download/" + fileName, {
            method: "get",
            mode: "cors",
            headers: myStore.getState().authHeader
        }).then(response => {
            checkResponseStatusAndThrow(response);
            return response.text();
        }).then(data => {
            fileDownload(data, fileName)
        }).catch((error) => {
            catchErrorAndDispatchMsg(dispatch, error)
        })
    }
};

export const checkUser = (user, password) => {
    return dispatch => {
        return fetch("/login", {
            method: "post",
            mode: "cors",
            headers: new Headers({"Authorization": "Basic " + user + ":" + password})
        }).then(() => {
            dispatch(login(user, password))
        }).catch((error) => {
            console.log(error);
        })
    }
}

const login = (user, password) => {
    return {
        type: "LOGIN",
        user: user,
        password: password
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}