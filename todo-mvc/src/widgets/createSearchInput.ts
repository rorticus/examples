import createFocusableTextInput from './createFocusableTextInput';
import { VNodeProperties } from 'dojo-interfaces/vdom';

const createSearchInput = createFocusableTextInput.mixin({
	mixin: {
		classes: [ 'search' ],
		nodeAttributes: [
			function (this: any): VNodeProperties {
				const { placeholder = '' } = this.state;

				return {
					placeholder
				};
			}
		]
	}
});

export default createSearchInput;
