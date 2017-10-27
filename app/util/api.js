import storage from './storage';

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
				resolve();
			} else {
				reject();
			}
		})
	});
}

export function logout () {
	return new Promise((resolve, reject) => {
		timed(() => {
			storage('token', 'remove');
			resolve();
		})
	});
}