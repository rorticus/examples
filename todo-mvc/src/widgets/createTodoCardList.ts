import { WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w, v } from 'dojo-widgets/d';
import createTodoCardItem from './createTodoCardItem';
import { TodoItemState } from './createTodoListItem';
import { TodoList } from './createTodoItemList';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import { Item } from '../stores/todoStore';

interface TodoListProperties {
	activeFilter: string;
	activeView: string;
	todos: Item[];
}

type TodoListState = WidgetState & TodoListProperties;

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

function applySearch(searchQuery: string, todo: Item): boolean {
	return searchQuery === '' || (todo.label || '').toLowerCase().indexOf(searchQuery) >= 0;
}

const createTodoItemList = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'todo-list', 'card-list' ],
		nodeAttributes: [
			function(this: any): VNodeProperties {
				const { todos = [] } = this.state;

				return {
					classes: {
						empty: !todos.length
					}
				};
			}
		],
		getChildrenNodes: function (this: TodoList): DNode[] {
			const activeFilter = this.state.activeFilter || '';
			const todos = this.state.todos || [];
			const search = this.state.search || '';

			return todos
				.filter((todo) => filter(activeFilter, todo))
				.filter((todo) => applySearch(search.toLowerCase(), todo))
				.map((todo) => <DNode> w(createTodoCardItem, { id: todo.id, properties: todo }))
				.concat(todos.length ? [
					v('li.empty-filler', {}),
					v('li.empty-filler', {})
				] : null);
		}
	}
});

export default createTodoItemList;
