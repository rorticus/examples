import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w, v } from 'dojo-widgets/d';

import { todoToggleAll, updateSearch } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoItemList from './createTodoItemList';
import createTodoCardList from './createTodoCardList';
import createSearchInput from './createSearchInput';

function searchHandler(event: any) {
	updateSearch(event.target.value);
}

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<WidgetState>): DNode[] {
			const { state } = <any> this;
			const checkBoxOptions = {
				id: 'todo-toggle',
				state: {
					checked: (<any> state).allCompleted,
					classes: [ 'toggle-all' ]
				},
				listeners: {
					change: todoToggleAll
				}
			};

			const { activeView } = state;
			const listFactory = activeView === 'cards' ? createTodoCardList : createTodoItemList;

			return <DNode[]> [
				w(createCheckboxInput, <WidgetOptions<WidgetState> > checkBoxOptions),
				state.todos.length ? v('div.searchbar', {}, [
						v('span.icon', {}),
						w(createSearchInput, {
							state: {
								placeholder: 'Quick Filter',
								value: state.search
							},
							listeners: {
								input: searchHandler
							}
						})
					]) : null,
				w(listFactory, <WidgetOptions<WidgetState> > {
					id: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}`,
					state
				})
			];
		}
	}
});

export default createMainSection;
