import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errorMessage: null, 
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errorMessage: null, comments: action.payload}

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errorMessage: action.payload, comments: []}

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments:state.comments.concat(comment)}

        default:
            return state;
    }
}