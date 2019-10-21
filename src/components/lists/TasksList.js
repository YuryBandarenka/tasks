import React, { Fragment, useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Components

import ShowMoreButton from '../buttons/ShowMoreButton';

// Action Creators

import { toggleTaskCompleteness, setReorderedTasks } from '../../actions/actionCreators';




const TasksList = props => {

    const {
        tasks,
        tasks: {
            length: tasksQty
        }
    } = props;

    const [ shownQty, changeShownQty ] = useState(5);

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "lightgreen" : "grey",
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    const getTasks = () => {

        const tasksListForRender = tasks.slice(0, shownQty);

        const handleCheckboxClick = ({ target: { name } }) => {
            props.actions.toggleTaskCompleteness(+name);
        };

        const reorder = (tasks, startIndex, endIndex) => {
            const result = Array.from(tasks);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };

        const onDragEnd = result => {

            if (!result.destination) {
                return;
            }

            const reorderedTasks = reorder(
                tasksListForRender,
                result.source.index,
                result.destination.index
            );

            props.actions.setReorderedTasks(reorderedTasks);
        };

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            { ...provided.droppableProps }
                            ref={ provided.innerRef }
                            style={ getListStyle(snapshot.isDraggingOver) }
                        >
                            { tasksListForRender.map((task, index) => {

                                const {
                                    id,
                                    details,
                                    completed
                                } = task;

                                return (
                                    <Draggable
                                        key={id}
                                        draggableId={id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <li
                                                ref={ provided.innerRef }
                                                { ...provided.draggableProps }
                                                { ...provided.dragHandleProps }
                                                style={ getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <input
                                                    type='checkbox'
                                                    name={id}
                                                    value={completed}
                                                    onClick={handleCheckboxClick}
                                                />
                                                <span> { details } </span>
                                            </li>
                                        )}
                                    </Draggable>
                                )
                            })}
                            { provided.placeholder }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    return (
        <Fragment>

            <h3>Tasks list</h3>

            {
                tasksQty > 0 ?

                    <Fragment>
                        <ul className='tasks-list'>
                            { getTasks() }
                        </ul>
                        <ShowMoreButton
                            { ...{
                                tasksQty,
                                shownQty,
                                changeShownQty
                            } }
                        />
                    </Fragment> :

                    <p> No tasks </p>
            }

        </Fragment>
    );
};

const mapStateToProps = state => ({
    tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        setReorderedTasks,
        toggleTaskCompleteness
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);