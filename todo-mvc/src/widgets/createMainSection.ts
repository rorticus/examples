import { DNode, Widget, WidgetState, WidgetOptions, WidgetProperties } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w, v } from 'dojo-widgets/d';

import { todoToggleAll, updateSearch } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoItemList from './createTodoItemList';
import createTodoCardList from './createTodoCardList';
import createSearchInput from './createSearchInput';
import { CheckboxInputOptions } from './createCheckboxInput';

interface MainSectionProperties {
	allCompleted: boolean;
}

type MainSectionState = WidgetState & MainSectionProperties;

function searchHandler(event: any) {
	updateSearch(event.target.value);
}

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<MainSectionState, MainSectionProperties>): DNode[] {
			const { state } = <any> this;
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

			const { activeView } = state;
			const listFactory = activeView === 'cards' ? createTodoCardList : createTodoItemList;return <DNode[]>[
				w(createCheckboxInput, <CheckboxInputOptions>  checkBoxOptions),
				state.todos.length ? v('div.searchbar', {}, [
						v('span.icon', {}),w(createSearchInput, {
							state: {
								placeholder: 'Quick Filter',
								value: state.search
							},
							listeners: {
								input: searchHandler
							}
						})
					]) : null,
				w(listFactory, <WidgetOptions<WidgetState, WidgetProperties> > { id: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}`, properties:state })
			];
		}
	}
});

export default createMainSection;
