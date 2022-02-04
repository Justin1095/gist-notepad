export const fetchNotes = () => {
	return fetch("https://api.github.com/gists/a4e15cf90cf825828ac72e55a2e62d9f")
		.then((reponse) => {
			if (reponse.ok) {
				return reponse.json();
			}
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};
