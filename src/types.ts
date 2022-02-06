export interface Note {
	filename: string;
	type: string;
	language: string | null;
	raw_url: string;
	size?: Number;
	truncated: boolean;
	content: string;
}
