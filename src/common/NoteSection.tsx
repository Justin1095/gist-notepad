import React, { useState } from "react";
import { Note } from "../types";

interface Props {
	value?: Note;
	notes: Note[];
	setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
	includeAddBtn?: boolean;
	includeDeleteBtn?: boolean;
	readOnly?: boolean;
}

const NoteSection = ({
	value,
	notes,
	setNotes,
	includeAddBtn,
	includeDeleteBtn,
	readOnly,
}: Props) => {
	const [fileName, setFileName] = useState(value?.filename || "");
	const [content, setContent] = useState(value?.content || "");
	const maxTitleCharacterLimit = 255;
	const maxNoteCharacterLimit = 1000;

	const isValidTitle = (title: string) => {
		const isTitleInNotes = notes?.some((note) => title === note.filename);
		if (isTitleInNotes) {
			console.log("Error! The Note title needs to be unique!");
			return false;
		}
		if (title.length > maxTitleCharacterLimit) {
			console.log("Error! The note title is over 255 characters!");
			return false;
		}
		if (title.length === 0) {
			console.log("Error! The note title cannot be blank!");
			return false;
		}

		return true;
	};

	const isValidNote = (note: string) => {
		if (note.length > maxNoteCharacterLimit) {
			console.log("Error! The note is over 255 characters!");
			return false;
		}
		if (note.length === 0) {
			console.log("Error! The note cannot be blank!");
			return false;
		}

		return true;
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		isValidTitle(e.target.value);
		setFileName(e.target.value);
	};

	const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		isValidNote(e.target.value);
		setContent(e.target.value);
	};

	const addNote = () => {
		const isValid = isValidTitle(fileName) || isValidNote(content);

		if (isValid) {
			const newNote = {
				filename: fileName,
				type: "text/plain",
				language: null,
				raw_url: "",
				size: content.length,
				truncated: false,
				content: content,
			};

			setNotes([...notes, newNote]);
		}
	};

	const deleteNote = () => {
		if (value) {
			const updatedNotes = notes.filter(
				(note) => value.filename !== note.filename
			);
			setNotes(updatedNotes);
		}
	};

	return (
		<div>
			<div className="row">
				<div className="col-4">
					<input
						type="text"
						value={fileName}
						placeholder="Enter note title..."
						disabled={readOnly}
						onChange={handleTitleChange}
					/>
					{includeDeleteBtn && (
						<button className="deleteBtn" onClick={deleteNote}>
							Delete
						</button>
					)}
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<textarea
						rows={4}
						value={content}
						placeholder="Enter note..."
						disabled={readOnly}
						onChange={handleNotesChange}
					/>
				</div>
			</div>
			{includeAddBtn && (
				<button className="addBtn" onClick={addNote}>
					Add
				</button>
			)}
		</div>
	);
};

export default NoteSection;
