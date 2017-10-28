import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export default function goto (route) {
	console.log('goto', route);
	history.push(route);
}