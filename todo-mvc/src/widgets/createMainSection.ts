import { DNode, Widget, WidgetState, WidgetOptions, WidgetProperties } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';

import { todoToggleAll } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoList from './createTodoList';
import { CheckboxInputOptions } from './createCheckboxInput';

interface MainSectionProperties {
	allCompleted: boolean;
}

type MainSectionState = WidgetState & MainSectionProperties;

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<MainSectionState, MainSectionProperties>): DNode[] {
			const { state } = this;
			const checkBoxOptions = {
				id: 'todo-toggle',
				properties: {
					checked: state.allCompleted,
					classes: [ 'toggle-all' ]
				},
				listeners: {
					change: todoToggleAll
				}
			};

			return [
				w(createCheckboxInput, <CheckboxInputOptions> checkBoxOptions),
				w(createTodoList, { id: 'todo-list', properties: state })
			];
		}
	}
});

export default createMainSection;
