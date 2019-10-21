

import { tasksActionTypes } from "../constants/actionTypes";

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {

    case tasksActionTypes.TOGGLE_TASK_COMPLETENESS:
        return state.map(task =>
            task.id === action.id ?
                {
                    ...task,
                    completed: !task.completed
                } :
                task
        );

    case tasksActionTypes.REORDER_TASKS:
        return action.reorderedTasks.concat(state.slice(action.reorderedTasks.length));

    case tasksActionTypes.SET_LOADED_TASKS:
        return action.tasks;

    case tasksActionTypes.CLEAR_STATE:
        return initialState;

    default:
        return state;
    }
}