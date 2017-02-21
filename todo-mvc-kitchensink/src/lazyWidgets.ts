import { registry } from '@dojo/widget-core/d';

const todoItemList = require('bundle-loader?lazy&name=lazy-widgets!./widgets/TodoItemList');

export default function registerLazyWidgets() {
	registry.define('TodoItemList', () => {
		return new Promise(resolve => {
			todoItemList((exports: any) => {
				resolve(exports.default);
			});
		});
	});
}
