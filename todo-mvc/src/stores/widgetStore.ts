import createObservableStore from './createObservableStore';

export default createObservableStore({
	data: [
		{
			id: 'todo-app',
			widgets: []
		},
		{
			id: 'home',
			todo: '',
			todos: [],
			activeFilter: 'all',
			activeView: 'list',
			search: ''
		},
		{
			id: 'todo-footer',
			activeCount: 0,
			completedCount: 0,
			allCompleted: 0
		},
		{
			id: 'todo-details',
			todoId: '',
			completed: false,
			label: '',
			createdOn: null
		}
	]
});
