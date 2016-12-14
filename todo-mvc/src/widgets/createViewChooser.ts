import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { WidgetState, WidgetOptions, Widget, DNode } from 'dojo-widgets/interfaces';
import { v } from 'dojo-widgets/d';
import { view } from '../actions/userActions';

type ViewChooserState = WidgetState & {
	activeView?: 'list' | 'cards'
};

type TodoListOptions = WidgetOptions<ViewChooserState>;

export type TodoList = Widget<ViewChooserState>;

const createViewChooser = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'view-chooser' ],
		getChildrenNodes: function (this: TodoList): DNode[] {
			const { activeView = 'list', filter = 'all' } = this.state;

			return [
				v('li.view-mode', {}, [
					v('a', {
						href: `#${filter}`,
						classes: {
							list: true,
							active: activeView === 'list'
						}
					})
				]),
				v('li.view-mode', {}, [
					v('a', {
						href: `#cards/${filter}`,
						classes: {
							cards: true,
							active: activeView === 'cards'
						}
					})
				])
			];
		}
	}
});

export default createViewChooser;
