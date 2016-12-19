import { DNode, Widget, WidgetState } from 'dojo-widgets/interfaces';
import createProjector from 'dojo-widgets/createProjector';
import { w } from 'dojo-widgets/d';

import createTodoDetails from './widgets/createTodoDetails';
import FactoryRegistry from 'dojo-widgets/FactoryRegistry';
import createHome from './widgets/createHome';

const widgetRegistry = new FactoryRegistry();

widgetRegistry.define('main', createHome);
widgetRegistry.define('todo-details', createTodoDetails);

const createApp = createProjector.mixin({
	mixin: {
		registry: widgetRegistry,
		getChildrenNodes: function(this: Widget<WidgetState>): DNode[] {
			const { widgets = [ 'main' ] } = this.state;

			return widgets.map((widget: any) => {
				return w(widget[ 0 ], { ...widget[ 1 ] });
			});
		},
		classes: [ 'todoapp' ],
		tagName: 'section'
	}
});

export default createApp;
