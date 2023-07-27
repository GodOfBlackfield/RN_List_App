export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASK_ID';

export const setTask = tasks => dispatch => {
  dispatch({
    type: SET_TASKS,
    payload: tasks,
  });
};

export const setID = taskID => dispatch => {
  dispatch({
    type: SET_TASK_ID,
    payload: taskID,
  });
};
