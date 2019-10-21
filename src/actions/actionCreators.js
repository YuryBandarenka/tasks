
import { tasksActionTypes } from '../constants/actionTypes';


export const setLoadedTasks = tasks => async dispatch => {
    dispatch({
        type: tasksActionTypes.SET_LOADED_TASKS,
        tasks
    });
};

export const toggleTaskCompleteness = id => ({
    type: tasksActionTypes.TOGGLE_TASK_COMPLETENESS,
    id
});

export const setReorderedTasks = reorderedTasks => ({
    type: tasksActionTypes.REORDER_TASKS,
    reorderedTasks
});
