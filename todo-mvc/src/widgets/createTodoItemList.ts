import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';
import createTodoListItem, { TodoItemState } from './createTodoListItem';

type TodoListState = WidgetState & {
	activeFilter?: string;
	activeView?: string;
	todos: TodoItemState[];
};

type TodoListOptions = WidgetOptions<TodoListState>;

export type TodoList = Widget<TodoListState>;

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
			classes: [ 'todo-list' ],
			getChildrenNodes: function(this: TodoList): DNode[] {
				const activeFilter = this.state.activeFilter || '';
				const todos = this.state.todos || [];

				return todos
					.filter((todo) => filter(activeFilter, todo))
					.map((todo) => w(createTodoListItem, { id: todo.id, state: todo }));
			}
		}
	});

export default createTodoItemList;
