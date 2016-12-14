import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w, v } from 'dojo-widgets/d';
import createTodoCardItem from './createTodoCardItem';
import { TodoItemState } from './createTodoListItem';
import { TodoList } from './createTodoItemList';

type TodoListState = WidgetState & {
	activeFilter?: string;
	activeView?: string;
	todos: TodoItemState[];
};

function filter(filterName: string, todo: TodoItemState): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

const createTodoItemList = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'todo-list', 'card-list' ],
		getChildrenNodes: function (this: TodoList): DNode[] {
			const activeFilter = this.state.activeFilter || '';
			const todos = this.state.todos || [];

			return todos
				.filter((todo) => filter(activeFilter, todo))
				.map((todo) => <DNode> w(createTodoCardItem, { id: todo.id, state: todo }))
				.concat(todos.length ? [
					v('li.empty-filler', {}),
					v('li.empty-filler', {})
				] : null);
		}
	}
});

export default createTodoItemList;
