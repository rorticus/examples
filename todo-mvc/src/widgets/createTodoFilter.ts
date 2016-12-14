import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v }  from 'dojo-widgets/d';

type TodoFilterState = WidgetState & {
	activeFilter?: string;
	activeView?: string;
};

type TodoFilterOptions = WidgetOptions<TodoFilterState>;

type TodoFilter = Widget<TodoFilterState>;

function createFilterItems(activeFilter: string, activeView: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[0].toUpperCase() + filterItem.substring(1);
		return v('li', {}, [
			v('a', {
				innerHTML: label,
				href: `#${activeView === 'cards' ? 'cards/' : ''}${filterItem}`,
				classes: {
					selected: activeFilter === filterItem
				}
			})
		]);
	});
}

const createTodoFilter = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'filters' ],
		getChildrenNodes: function(this: TodoFilter): DNode[] {
			const activeFilter = this.state.activeFilter || '';
			const activeView = this.state.activeView || '';

			return createFilterItems(activeFilter, activeView);
		}
	}
});

export default createTodoFilter;
