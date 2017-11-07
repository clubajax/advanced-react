import storage from './storage';
import goto from './goto';

const API_DELAY = 100;

const users = {
	clubajax: '123',
	qwe: '123'
};

function timed (cb, time) {
	setTimeout(cb, time || API_DELAY);
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
		}, 100)
	});
}

export function auth () {
	return new Promise((resolve) => {
		timed(() => {
			resolve(storage('token'));
		});
	});
}

export function postCar (data) {
	return new Promise((resolve, reject) => {
		if (data.type && data.make && data.model) {
			storage('type', data.type);
			storage('make', data.make);
			storage('model', data.model);
			storage('link', data.link);
			timed(() => {
				resolve();
			});
		} else {
			timed(() => {
				reject({
					status: 400,
					message: 'Missing parameters'
				});
			});
		}
	});
}

export function getCar () {
	return new Promise((resolve) => {
		timed(() => {
			if (!storage('make')) {
				resolve(null);
				return;
			}
			resolve({
				type: storage('type'),
				make: storage('make'),
				model: storage('model'),
				link: storage('link')
			});
		});
	});
}