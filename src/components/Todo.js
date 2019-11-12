import React, {Component} from 'react';
import TodoListItem from "./todoListItem";

class toDo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemCount: 0,
			uncheckedCount: 0,
			toDoList: {},
		};
		this.deleteTodo = this.deleteTodo.bind(this);
		this.newTodo = this.newTodo.bind(this);
		this.updateUncheckedCount = this.updateUncheckedCount.bind(this);
	}

	/**
	 * Updates the UncheckedCount
	 * @param {number} count
	 */
	updateUncheckedCount (count) {
		const uncheckedCount = this.state.uncheckedCount + count;
		this.setState({uncheckedCount});
	}

	/**
	 * Deletes to do item
	 * @param {number} id
	 * @param {boolean} checked
	 */
	deleteTodo (id, checked) {
		let toDoList = this.state.toDoList;
		delete toDoList[id];
		const itemCount = this.state.itemCount - 1;
		const uncheckedCount = checked ? this.state.uncheckedCount : this.state.uncheckedCount - 1;
		return this.setState({toDoList, itemCount, uncheckedCount});
	}

	/**
	 * Creates new to do item
	 */
	newTodo () {
		let toDoList = this.state.toDoList;
		const id = Date.now(); //should be random enough
		const listItem = (<TodoListItem
			key={id}
			id={id}
			deleteTodo={this.deleteTodo}
			todoCheckBoxHandler={this.todoCheckBoxHandler}
			todoInputHandler={this.todoInputHandler}
			updateUncheckedCount={this.updateUncheckedCount}
		/>);
		toDoList[id] = listItem;
		const itemCount = Object.keys(toDoList).length;
		const uncheckedCount = this.state.uncheckedCount + 1;
		return this.setState({toDoList, itemCount, uncheckedCount});
	}

	/**
	 * Builds ToDoList based on the toDoList object
	 * The reason for this instead of building an array
	 * is to be able to easily identify the todoList item by id/key
	 * @returns {*[]}
	 */
	buildToDoList () {
		return Object.keys(this.state.toDoList)
			.map(toDoKey => {
				return this.state.toDoList[toDoKey];
			});
	}


	render() {
		const todoList = this.buildToDoList();
		return (
			<div className="container center">
				<h1 className="center title">My TODO App</h1>
				<div className="flow-right controls">
					<span>Item count: <span id="item-count">{this.state.itemCount}</span></span>
					<span>Unchecked count: <span id="unchecked-count">{this.state.uncheckedCount}</span></span>
				</div>
				<button className="button center" onClick={this.newTodo}>New TODO</button>
				<ul id="todo-list" className="todo-list list-group">
					{todoList}
				</ul>
			</div>
		);
	}
}

export default toDo;