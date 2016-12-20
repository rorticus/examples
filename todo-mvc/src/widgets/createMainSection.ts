import { DNode, Widget, WidgetState, WidgetOptions } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w, v } from 'dojo-widgets/d';

import { todoToggleAll, updateSearch } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoItemList from './createTodoItemList';
import createSearchInput from './createSearchInput';
import { Item } from '../stores/todoStore';

function searchHandler(event: any) {
	updateSearch(event.target.value);
}

interface MainState extends WidgetState {
	activeView?: 'list' | 'cards';
	activeFilter?: string;
	todos?: Item[];
	search?: string;
}

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<MainState>): DNode[] {
			const { state } = this;
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

			const { todos = [], activeView = 'list', search = '' } = state;

			return <DNode[]> [
				w(createCheckboxInput, <WidgetOptions<WidgetState> > checkBoxOptions),
				todos.length ? v('div.searchbar', {}, [
						v('span.icon', {}),
						w(createSearchInput, {
							state: {
								placeholder: 'Quick Filter',
								value: search
							},
							listeners: {
								input: searchHandler
							}
						})
					]) : null,
				w(createTodoItemList, <WidgetOptions<WidgetState> > {
					id: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}`,
					state
				})
			];
		}
	}
});

export default createMainSection;
