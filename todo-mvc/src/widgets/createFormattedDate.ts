import { Widget, WidgetState } from 'dojo-widgets/interfaces';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { padStart } from 'dojo-shim/string';

const createFormattedDate = createWidgetBase.mixin({
	mixin: {
		tagName: 'span',
		nodeAttributes: [
			function (this: Widget<WidgetState & { label: string }>): VNodeProperties {
				const { date = new Date() } = this.state;
				let hours = date.getHours();
				const minutes = date.getMinutes();
				let suffix = 'am';

				if(hours >= 12) {
					suffix = 'pm';

					hours = hours % 12;
					if(!hours) {
						hours = 12;
					}
				}

				return {
					innerHTML: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${hours}:${padStart(minutes, 2, '0')}${suffix}`
				};
			}
		]
	}
});

export default createFormattedDate;
