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

export const messageReducer = (state = {error: false, msg: ""}, action) => {
    switch (action.type) {
        case "SET_MSG":
            return Object.assign({}, action.payload);
    }

    return state;
};

export const searchReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return action.payload;
    }

    return state;
};