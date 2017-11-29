export const filesReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_FILES":
            return Object.assign([], action.payload);
    }

    return state;
};

export const linksReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_LINKS":
            return Object.assign([], action.payload);
    }

    return state;
};

export const pageSizeReducer = (state = 10, action) => {
    switch(action.type) {
        case "SET_PAGE_SIZE":
            return action.payload;
    }

    return state;
};

export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case "LOGIN":
            return new Headers({"Authorization": "Basic " + action.user + ":" + action.password});
        case "LOGOUT":
            return {};
    }

    return state;
}

export const messageReducer = (state = {error: false, msg: ""}, action) => {
    switch (action.type) {
        case "SET_MSG":
            return Object.assign({}, action.payload);
    }

    return state;
}