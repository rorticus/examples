import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w, v } from 'dojo-widgets/d';
import createTodoListItem, { TodoItemState } from './createTodoListItem';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createTodoCardItem from './createTodoCardItem';

type TodoListState = WidgetState & {
	activeFilter?: string;
	activeView?: string;
	todos: TodoItemState[];
	search?: string;
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

function applySearch(searchQuery: string, todo: TodoItemState): boolean {
	return searchQuery === '' || (todo.label || '').toLowerCase().indexOf(searchQuery) >= 0;
}

const createTodoItemList = createWidgetBase.mixin({
		mixin: {
			tagName: 'ul',
			classes: [ 'todo-list' ],
			nodeAttributes: [
				function (this: TodoList): VNodeProperties {
					const { activeView = 'list', todos = [] } = this.state;

					return {
						classes: {
							'card-list': activeView === 'cards',
							'empty': !todos.length
						}
					}
				}
			],
			getChildrenNodes: function(this: TodoList): DNode[] {
				const activeFilter = this.state.activeFilter || '';
				const todos = this.state.todos || [];
				const search = this.state.search || '';
				const activeView = this.state.activeView || 'list';

				return todos
					.filter((todo) => filter(activeFilter, todo))
					.filter((todo) => applySearch(search.toLowerCase(), todo))
					.map((todo) => <DNode> w(activeView === 'cards' ? createTodoCardItem : createTodoListItem, <WidgetOptions<WidgetState>> {
						id: todo.id,
						state: todo
					}))
					.concat((activeView === 'cards' && todos.length) ? [
							v('li.empty-filler', {}),
							v('li.empty-filler', {})
						] : [])
			}
		}
	});

export default createTodoItemList;
