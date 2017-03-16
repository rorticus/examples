import load from '@dojo/core/load';
import { registry } from '@dojo/widget-core/d';

export default function registerLazyWidgets() {
	registry.define('todo-footer', () => {
		return load(<any> require, './widgets/TodoFooter').then(([ todoFooter ]) => todoFooter.default);
	});

	registry.define('view-chooser', () => {
		return load(<any> require, './widgets/ViewChooser').then(([ viewChooser ]) => viewChooser.default);
	});

	registry.define('filters', () => {
		return load(<any> require, './widgets/TodoFilter').then(([ todoFilter ]) => todoFilter.default);
	});
}
