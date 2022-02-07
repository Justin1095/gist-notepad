import { Octokit } from "@octokit/core";
import { Note } from "./types";

// I hid my access key inside a .env
const octokit = new Octokit({
	auth: process.env.REACT_APP_GITHUB_GIST_ACCESS_KEY,
});
const gistId = "398c2f0ddbec86350ed26b769f9fb580";

// Converts array to object
const notesArrayToObject = (
	notes: any[],
	key: string,
	shouldBeEmpty: boolean
) => {
	return notes.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: shouldBeEmpty ? {} : item,
		};
	}, {});
};

// Fetches data
export const fetchGists = async () => {
	const reponse = await octokit.request("GET /gists/{gist_id}", {
		gist_id: gistId,
	});
	return reponse.data;
};

// Post data
export const postGist = async (note: Note) => {
	await octokit.request("POST /gists/{gist_id}", {
		gist_id: gistId,
		files: {
			name: {
				filename: note.filename,
				content: note.content,
			},
		},
	});
};

// Deletes a note
export const deleteGist = async (filename: string) => {
	await octokit.request(`PATCH /gists/{gist_id}`, {
		gist_id: gistId,
		files: {
			[filename]: {},
		},
	});
};

// Deletes all notes
export const deleteAllGist = async (notes: Note[]) => {
	const files = notesArrayToObject(notes, "orginalFilename", true);
	await octokit.request(`PATCH /gists/{gist_id}`, {
		gist_id: gistId,
		description: "",
		files,
	});
};

// Updates data
export const updateGist = async (title: string, notes: Note[]) => {
	const files = notesArrayToObject(notes, "orginalFilename", false);
	await octokit.request(`PATCH /gists/{gist_id}`, {
		gist_id: gistId,
		description: title,
		files,
	});
};
