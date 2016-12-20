import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { WidgetState, WidgetOptions, Widget, DNode } from 'dojo-widgets/interfaces';
import { v } from 'dojo-widgets/d';
import router, { mainRoute } from '../routes';

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
			const { activeView = 'list' } = this.state;

			return [
				v('li.view-mode', {}, [
					v('a', {
						href: router.link(mainRoute, {
							view: 'list'
						}),
						classes: {
							list: true,
							active: activeView === 'list'
						}
					})
				]),
				v('li.view-mode', {}, [
					v('a', {
						href: router.link(mainRoute, {
							view: 'cards'
						}),
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
