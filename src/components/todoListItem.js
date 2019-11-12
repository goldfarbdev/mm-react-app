import React, { Component } from 'react';

/**
 * The reason for separating todoListItem in its own component is
 * to be able to control the state of the individual item locally as it is
 * independent to the count of items and unchecked items
 * If we were to add a save method to a database API, then we can use
 * redux to maintain the state of all the items.
 */
class todoListItem extends Component {
	constructor (props) {
		super(props);
		this.state = {
			checked: false,
			value: ''
		};
		this.todoInputHandler = this.todoInputHandler.bind(this);
		this.todoCheckBoxHandler = this.todoCheckBoxHandler.bind(this);
	}

	/**
	 * Updates the value of the todoInput
	 * @param {Event} e
	 */
	todoInputHandler (e) {
		const value = e.target.value;
		this.setState({ value });
	}

	/**
	 * Toggles the checkbox and returns the function
	 * to update the unchecked count
	 * @param {Event} e
	 */
	todoCheckBoxHandler (e) {
		const checked = e.target.checked;
		const count = checked ? -1 : 1;
		this.setState({checked}, this.props.updateUncheckedCount(count));
	}

	render() {
		return (
			<li className="todo-container" key={'todoKey' + this.props.id}>
				<input
					defaultChecked={this.state.checked}
					className="todo-checkbox"
					type="checkbox"
					name={'todo' + this.props.id}
					onChange={this.todoCheckBoxHandler}
				/>
				<input
					type="text"
					name={'todoInput' + this.props.id}
					value={this.props.value}
					onChange={this.todoInputHandler}
				/>
				<button onClick={()=> {this.props.deleteTodo(this.props.id, this.state.checked);}} className="todo-delete">X</button>
			</li>
		);
	}
};

export default todoListItem;