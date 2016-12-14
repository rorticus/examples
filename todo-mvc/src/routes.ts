import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import { Parameters } from 'dojo-routing/interfaces';
import createHashHistory from 'dojo-routing/history/createHashHistory';

import { filterAndView } from './actions/userActions';

interface FilterParameters extends Parameters {
	filter: 'active' | 'all' | 'completed';
}

function getFilterState(filter: string): FilterParameters | null {
	switch (filter) {
		case 'active':
			return { filter: 'active' };
		case 'all':
			return { filter: 'all' };
		case 'completed':
			return { filter: 'completed' };
		default:
			return null;
	}
}

const filterRoute = createRoute<FilterParameters>({
	path: '/{filter}',

	params([filter]) {
		return getFilterState(filter);
	},

	exec(request) {
		const { filter } = request.params;
		return filterAndView({ filter, view: 'list' });
	}
});

const cardViewRoute = createRoute<FilterParameters>({
	path: '/cards/{filter}',

	params([filter]) {
		return getFilterState(filter);
	},

	exec(request) {
		const { filter } = request.params;
		return filterAndView({ filter, view: 'cards' });
	}
});

const router = createRouter({ history: createHashHistory() });
router.append(filterRoute);
router.append(cardViewRoute);

export default router;
