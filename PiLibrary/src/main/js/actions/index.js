import client from '../client'
import follow from '../follow'
import myStore from '../store'
import fileDownload from 'js-file-download'

const root = "http://localhost:8080/api/";

const checkResponseStatusAndDispatchMessage = (response) => {
    if (response.status === 414 || response.status === 415)
        throw Promise.resolve(response.text());
    else if (response.status >= 400)
        throw Promise.resolve("Something went wrong with your request, please contact me.")
};

const catchErrorAndDispatchMsg = (dispatch, error) => {
    console.log("catch!");
    error.then((err) => dispatch(setMsg(true, err)));
};

export const getAllFiles = () => {
    return dispatch => {
        return follow(client, root, [
            {rel: 'uploadedFiles'}])
            .then(response => {
                dispatch(setFiles(response.entity._embedded.uploadedFiles));
                dispatch(setLinks(response.entity._links));
                dispatch(setSearch(""))
            }).catch((error) => {
                catchErrorAndDispatchMsg(dispatch, error)
            })
    }
};

export const updateFile = (link, updatedFile, ETag) => {
    return dispatch => {
        return client({
            method: 'put',
            path: link,
            entity: updatedFile,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'If-Match': ETag
            }
        }).then(response => {
            if (response.status.code === 412) {
                dispatch(setMsg(true, "Update failed, your copy is stale, refresh it"));
            }
        })
    }
}

export const getFile = (id) => {
    return dispatch => {
        return fetch(root + "/uploadedFiles/" + id, {
            method: "get",
            mode: "cors"
        })
    }
}

const setMsg = (error, msg) => {
    return {
        type: "SET_MSG",
        payload: {error: error, msg: msg}
    }
};

export const searchByString = (searchString) => {
    return dispatch => {
        return client({
            method: 'get',
            path: root + '/uploadedFiles/search/findContaining/' + searchString
        }).then(response => {
            dispatch(setFiles(response.entity.sort((item1, item2) => {
                return item1.name.localeCompare(item2.name)
            })));
            dispatch(setLinks([]));
            dispatch(setSearch(searchString));
        })
    }
};

export const searchByTags = (tags) => {
    let encodedTags = tags.replace('#', '+');
    return dispatch => {
        return client({
            method: 'get',
            path: root + '/uploadedFiles/search/findByTags/' + encodedTags
        }).then(response => {
            dispatch(setFiles(response.entity.sort((item1, item2) => {
                return item1.name.localeCompare(item2.name)
            })));
            dispatch(setLinks([]));
            dispatch(setSearch(tags));
        })
    }
};

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

export const uploadFile = (data) => {
    return dispatch => {
        return fetch(root + "/uploadedFiles/upload", {
            mode: "cors",
            body: data,
            method: "post",
            credentials: 'include',
        }).then((response) => {
            checkResponseStatusAndDispatchMessage(response);
            dispatch(getAllFiles())
        }).catch((error) => {
            catchErrorAndDispatchMsg(dispatch, error)
        });
    }
};

export const loadComments = (data) => {
    return dispatch => {
        return client({
            method: 'GET',
            path: root + "comments/search/findByTarget?target=" + data
        }).then(response => {
            checkResponseStatusAndDispatchMessage(response);
            return response.entity._embedded.comments
        }).catch((error) => {
            catchErrorAndDispatchMsg(dispatch, error)
        })
    }
};

export const deleteFile = (data) => {
    return dispatch => {
        return fetch(root + "uploadedFiles/delete/" + data, {
            method: "delete",
            mode: "cors",
            credentials: 'include'
        }).then((response) => {
            checkResponseStatusAndDispatchMessage(response);
            dispatch(getAllFiles())
        }).catch((error) => {
            catchErrorAndDispatchMsg(dispatch, error)
        })
    }
};

export const uploadComment = (data) => {
    return dispatch => {
        return fetch(root + "/comments/comment", {
            mode: 'cors',
            body: data,
            method: 'post',
            credentials: 'include'
        }).then((response) => {
            checkResponseStatusAndDispatchMessage(response);
            dispatch(getAllFiles())
        }).catch((error) => {
            catchErrorAndDispatchMsg(dispatch, error)
        })
    }
};

export const downloadFile = (fileName) => {
    return dispatch => {
        return fetch(root + "/uploadedFiles/download/" + fileName, {
            method: "get",
            mode: "cors",
        }).then(response => {
            checkResponseStatusAndDispatchMessage(response);
            return response.text();
        }).then(data => {
            fileDownload(data, fileName)
        }).catch((error) => {
            catchErrorAndDispatchMsg(dispatch, error)
        })
    }
};

export const setSearch = (searchTerm) => {
    return {
        type: "SET_SEARCH",
        payload: searchTerm
    }
}
