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
			activePage: 0,
			search: ''
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
