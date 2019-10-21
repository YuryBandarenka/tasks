import React, { Fragment, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'

import { setLoadedTasks } from "../actions/actionCreators";
import tasks from '../fakeData/tasks';


import TasksList from './lists/TasksList';

const App = props => {

    // Imitation of loading tasks from server

    useEffect(() => {

        Promise
            .resolve(tasks)
            .then(loadedTasks => props.actions.setLoadedTasks(loadedTasks.data));
    }, []);

    return (
        <Fragment>
            <TasksList />
        </Fragment>
    )
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        setLoadedTasks
    }, dispatch)
});

export default connect(null, mapDispatchToProps)(App);