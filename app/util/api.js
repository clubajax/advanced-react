import storage from './storage';
import goto from './goto';

const API_DELAY = 1000;

const users = {
	clubajax: '123'
};

function timed (cb) {
	setTimeout(cb, API_DELAY);
}

export function login (username, password) {
	return new Promise((resolve, reject) => {
		timed(() => {
			if (users[username] === password) {
				storage('token', true);
				storage('username', username);
				resolve();
			} else {
				reject({
					status: 401,
					message: 'Username or password not found'
				});
			}
		})
	});
}

export function logout () {
	return new Promise((resolve) => {
		timed(() => {
			storage('token', 'remove');
			storage('username', 'remove');
			goto('/');
			resolve();
		})
	});
}

export function auth () {
	return new Promise((resolve) => {
		timed(() => {
			resolve(storage('token'));
		})
	});
}