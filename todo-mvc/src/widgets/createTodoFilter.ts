import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v }  from 'dojo-widgets/d';
import router, { mainRoute } from '../routes';

type TodoFilterState = WidgetState & {
	activeFilter?: string;
};

type TodoFilterOptions = WidgetOptions<TodoFilterState>;

type TodoFilter = Widget<TodoFilterState>;

function createFilterItems(activeFilter: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[0].toUpperCase() + filterItem.substring(1);
		return v('li', {}, [
			v('a', {
				innerHTML: label,
				href: router.link(mainRoute, {
					filter: filterItem
				}),
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
