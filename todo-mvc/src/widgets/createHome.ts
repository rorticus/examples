import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, DNode, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import { todoInput } from '../actions/userActions';
import { TodoFooterState, default as createTodoFooter } from './createTodoFooter';
import { v, w } from 'dojo-widgets/d';
import createTitle from './createTitle';
import createFocusableTextInput from './createFocusableTextInput';
import createMainSection from './createMainSection';

const createHome = createWidgetBase.mixin({
	mixin: {
		getChildrenNodes: function(this: Widget<WidgetState>): DNode[] {
			const { state } = this;
			const { todo, todos } = <any> state;
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
			const classes = todos && todos.length ? [] : [ 'hidden' ];
			const todoFooterState: TodoFooterState = Object.assign({ classes }, state);

			return [
				v('header', {}, [
					w(createTitle, { id: 'title', state: { label: 'todos' } }),
					w(createFocusableTextInput, newTodoOptions)
				]),
				w(createMainSection, { id: 'main-section', state }),
				w(createTodoFooter, { id: 'todo-footer', state: todoFooterState })
			];
		},
		tagName: 'div'
	}
});

export default createHome;
