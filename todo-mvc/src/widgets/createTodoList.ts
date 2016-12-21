import { Widget, WidgetOptions, WidgetState, DNode, WidgetProperties } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';
import createTodoItem from './createTodoItem';
import { Item } from '../stores/todoStore';

type TodoListProperties = WidgetProperties & {
	activeFilter: string;
	todos: Item[];
};

type TodoListOptions = WidgetOptions<WidgetState, TodoListProperties>;

export type TodoList = Widget<WidgetState, TodoListProperties>;

function filter(filterName: string, todo: Item): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

const createTodoList = createWidgetBase.mixin({
		mixin: {
			tagName: 'ul',
			classes: [ 'todo-list' ],
			getChildrenNodes: function(this: TodoList): DNode[] {
				const { activeFilter = '', todos = []} = this.properties;

				return todos
					.filter((todo: Item) => filter(activeFilter, todo))
					.map((todo: Item) => w(createTodoItem, { id: todo.id, properties: todo }));
			}
		}
	});

export default createTodoList;
