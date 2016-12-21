import { Widget, WidgetOptions, WidgetState, DNode, WidgetProperties } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v }  from 'dojo-widgets/d';

interface TodoFilterProperties {
	activeFilter: string;
};

type TodoFilterState = WidgetState & TodoFilterProperties;
type TodoFilterOptions = WidgetOptions<TodoFilterState, TodoFilterProperties>;

type TodoFilter = Widget<TodoFilterState, TodoFilterOptions>;

function createFilterItems(activeFilter: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[0].toUpperCase() + filterItem.substring(1);
		return v('li', {}, [
			v('a', {
				innerHTML: label,
				href: `#${filterItem}`,
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
			return createFilterItems(activeFilter);
		}
	}
});

export default createTodoFilter;
