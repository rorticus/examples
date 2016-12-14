import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import createButton from 'dojo-widgets/components/button/createButton';
import { clearCompleted } from '../actions/userActions';
import createTodoFilter from './createTodoFilter';
import createViewChooser from './createViewChooser';

export type TodoFooterState = WidgetState & {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
};

export type TodoFooterOptions = WidgetOptions<TodoFooterState>;

export type TodoFooter = Widget<TodoFooterState>;

const createTodoFooter = createWidgetBase.mixin({
	mixin: {
		tagName: 'footer',
		classes: [ 'footer' ],
		getChildrenNodes: function(this: TodoFooter): (DNode | null)[] {
			const { activeCount, activeFilter, completedCount, activeView } = this.state;
			const countLabel = activeCount === 1 ? 'item' : 'items';

			return [
				v('span', { 'class': 'todo-count' }, [
					v('strong', [activeCount + ' ']),
					v('span', [countLabel + ' left'])
				]),
				w(createTodoFilter, {
					state: {
						classes: [ 'filters' ],
						activeFilter
					}
				}),
				w(createViewChooser, {
					state: {
						activeView
					}
				}),
				completedCount ? w(createButton, {
					listeners: {
						click: clearCompleted
					},
					state: {
						label: 'Clear completed',
						classes: [ 'clear-completed' ]
					}
				}) : null
			];
		}
	}
});

export default createTodoFooter;
