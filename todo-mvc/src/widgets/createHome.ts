import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, DNode, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import { todoInput } from '../actions/userActions';
import createTodoFooter from './createTodoFooter';
import { v, w } from 'dojo-widgets/d';
import createTitle from './createTitle';
import createFocusableTextInput from './createFocusableTextInput';
import createMainSection from './createMainSection';
import { Item } from '../stores/todoStore';

const createHome = createWidgetBase.mixin({
	mixin: {
		getChildrenNodes: function(this: Widget<WidgetState>): DNode[] {
			const { state } = this;
			const { todo, todos, activeView, activeFilter } = <any> state;
			const newTodoOptions: WidgetOptions<WidgetState> = {
				id: 'new-todo',
				state: {
					id: 'new-todo',
					classes: ['new-todo'],
					focused: true,
					value: todo ? todo : '',
					placeholder: 'What needs to be done?'
				},
				listeners: { keypress: todoInput }
			};

			return [
				v('header', {}, [
					w(createTitle, { id: 'title', state: { label: 'todos' } }),
					w(createFocusableTextInput, newTodoOptions)
				]),
				w(createMainSection, { id: 'main-section', state }),
				(todos && todos.length) ? w(createTodoFooter, <WidgetOptions<WidgetState>> {
						id: 'todo-footer',
						state: {
							activeCount: todos.reduce((sum: number, todo: Item) => sum + (todo.completed ? 0 : 1), 0),
							completedCount: todos.reduce((sum: number, todo: Item) => sum + (todo.completed ? 1 : 0), 0),
							allCompleted: todos.every((todo: Item) => todo.completed),
							activeView: activeView,
							activeFilter: activeFilter
						}
					}) : null
			];
		},
		tagName: 'div'
	}
});

export default createHome;
