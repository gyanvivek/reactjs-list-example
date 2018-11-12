
export const get = async url => {
	return fetch(url, {
		method: 'GET',
	});
};