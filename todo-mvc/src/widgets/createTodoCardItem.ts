import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import { TextInputOptions } from 'dojo-widgets/components/textinput/createTextInput';
import createButton from 'dojo-widgets/components/button/createButton';
import { todoEdit, todoEditInput, todoRemove, todoSave, todoToggleComplete } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createFocusableTextInput from './createFocusableTextInput';
import { TodoItem } from './createTodoListItem';

const createLabel = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'label',
			nodeAttributes: [
				function (this: Widget<WidgetState & { label: string }>): VNodeProperties {
					return {
						innerHTML: this.state.label,
						'aria-describedby': 'edit-instructions',
						tabindex: '0'
					};
				}
			]
		}
	});

const createTodoCardItem = createWidgetBase.mixin({
	mixin: {
		tagName: 'li',
		nodeAttributes: [
			function(this: TodoItem): VNodeProperties {
				const { completed, editing } = this.state;
				return {
					classes: { completed, editing, card: true }
				};
			}
		],
		getChildrenNodes: function(this: TodoItem): (DNode | null)[] {
			const state = this.state;
			const checked = state.completed;
			const label = state.label;
			const focused = state.editing;

			const inputOptions: TextInputOptions = {
				value: label,
				listeners: {
					blur: todoSave,
					keypress: todoEditInput
				},
				state: { id: state.id, focused, classes: [ 'edit' ] }
			};
			return [
				v('div.view', {}, [
					v('div.header', {}, [
						w(createCheckboxInput, {
							listeners: { change: todoToggleComplete },
							state: { id: state.id, classes: [ 'toggle' ], checked }
						}),
						w(createButton, {
							listeners: { click: todoRemove },
							state: { id: state.id, classes: [ 'destroy' ] }
						})
					]),
					w(createLabel, {
						listeners: {
							dblclick: todoEdit,
							keypress: todoEdit
						},
						state: { id: state.id, label }
					})
				]),
				state.editing ?
					w(createFocusableTextInput, inputOptions) : null
			];
		}
	}
});

export default createTodoCardItem;