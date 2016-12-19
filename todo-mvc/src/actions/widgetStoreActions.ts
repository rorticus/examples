import { StoreDelta } from 'dojo-stores/store/mixins/createObservableStoreMixin';
import widgetStore from '../stores/widgetStore';
import todoStore from '../stores/todoStore';

export const putTodo = function({ afterAll = [] }: StoreDelta<any>) {
	return widgetStore.patch([
		{ id: 'todo-app' },
		{ id: 'home', todos: afterAll }
	]);
};

export const setHierarchy = function (this: any, widgets: [ string, any ][]) {
	widgetStore.patch({ id: 'todo-app', widgets });
};

export const filterAndView = function (this: any, filter: 'active' | 'all' | 'completed', view: 'list' | 'cards') {
	const { state: { activeView = view, activeFilter = filter } = { } } = this;
	widgetStore.patch({ id: 'home', activeView, activeFilter });
};

export const showTodoDetails = function(todoId: string) {
	return todoStore.get(todoId).then(([ todo ]) => {
		widgetStore.patch({
			id: 'todo-details',
			todoId: todo.id,
			completed: todo.completed,
			label: todo.label,
			createdOn: todo.createdOn
		}).then(() => {
			setHierarchy([ [ 'main', {} ], [ 'todo-details', { id: 'todo-details', stateFrom: widgetStore } ] ]);
		});
	});
};
