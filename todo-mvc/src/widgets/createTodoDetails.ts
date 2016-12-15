import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, WidgetState, DNode } from 'dojo-widgets/interfaces';
import { v } from 'dojo-widgets/d';
import router, { mainRoute } from '../routes';

export type TodoDetailsState = WidgetState & {};

export type TodoDetails = Widget<TodoDetailsState>;

const createTodoDetails = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'div',
			classes: [ 'todo-details' ],
			getChildrenNodes(this: TodoDetails): DNode[] {
				const closeLink = router.link(mainRoute, {
					filter: (<any> this.state).activeFilter,
					view: (<any> this.state).activeView
				});

				return [
					v('div.backdrop', {}),
					v('div.modal', {}, [
						v('a.close', {
							href: closeLink
						}),
						v('header', {}, [
							v('div.title', {}, [
								'Details'
							])
						]),
						v('section', {}, [
							'Hello!'
						])
					])
				];
			}
		}
	});

export default createTodoDetails;
