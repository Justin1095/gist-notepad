import { Octokit } from "@octokit/core";
import { Note } from "./types";

// I hid my access key inside a .env
const octokit = new Octokit({
	auth: process.env.REACT_APP_GITHUB_GIST_ACCESS_KEY,
});
const gistId = "5e82aa03b8272a6b590e773777142cea";

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

export const fetchGists = async () => {
	const reponse = await octokit.request("GET /gists/{gist_id}", {
		gist_id: gistId,
	});
	return reponse.data;
};

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

export const deleteGist = async (filename: string) => {
	await octokit.request(`PATCH /gists/{gist_id}`, {
		gist_id: gistId,
		files: {
			[filename]: {},
		},
	});
};

export const deleteAllGist = async (notes: Note[]) => {
	const files = notesArrayToObject(notes, "filename", true);
	await octokit.request(`PATCH /gists/{gist_id}`, {
		gist_id: gistId,
		description: "",
		files,
	});
};

// Need some work
export const updateGist = async (title: string, notes: Note[]) => {
	const files = notesArrayToObject(notes, "filename", false);
	await octokit.request(`PATCH /gists/{gist_id}`, {
		gist_id: gistId,
		description: title,
		files,
	});
};
