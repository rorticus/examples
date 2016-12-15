import createObservableStore from './createObservableStore';

export default createObservableStore({
	data: [
		{
			id: 'todo-app',
			todo: '',
			todos: [],
			completedCount: 0,
			activeCount: 0,
			activeFilter: 'all',
			activeView: 'list',
			widgets: []
		}
	]
});
