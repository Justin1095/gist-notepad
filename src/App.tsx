import React, { useEffect, useMemo, useState } from "react";
import {
	deleteAllGist,
	deleteGist,
	fetchGists,
	postGist,
	updateGist,
} from "./Api";
import "./App.css";
import NoteSection from "./common/NoteSection";
import TopPanel from "./common/TopPanel";
import { Note } from "./types";

const App = () => {
	const [notes, setNotes] = useState<any>([]);
	const [title, setTitle] = useState("");
	const [fileName, setFileName] = useState("");
	const [content, setContent] = useState("");
	const maxTitleCharacterLimit = 255;
	const maxNoteCharacterLimit = 1000;

	useEffect(() => {
		const storedTitle = JSON.parse(localStorage.getItem("notepad-title") || "");
		const storedNotes = JSON.parse(localStorage.getItem("notepad-notes") || "");

		if (storedTitle && storedNotes) {
			setTitle(storedTitle);
			setNotes(storedNotes);
		} else if (storedNotes) {
			setNotes(storedNotes);
			fetchGists().then((reponse: any) => {
				if (reponse) {
					setTitle(reponse.description);
				}
			});
		} else {
			fetchGists().then((reponse: any) => {
				if (reponse) {
					setTitle(reponse.description);
					setNotes(Object.entries(reponse.files).map(([key, value]) => value));
				}
			});
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("notepad-title", JSON.stringify(title));
	}, [title]);

	useEffect(() => {
		localStorage.setItem("notepad-notes", JSON.stringify(notes));
	}, [notes]);

	const sortedNotes = useMemo(() => {
		return notes.sort((a: Note, b: Note) =>
			a.filename.localeCompare(b.filename)
		);
	}, [notes]);

	const isValidFileName = (title: string) => {
		const isTitleInNotes = notes?.some((note: Note) => title === note.filename);
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

	const isValidContent = (note: string) => {
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

	const isValidTitle = (title: string) => {
		if (title.length > maxTitleCharacterLimit) {
			console.log("Error! The title is over 255 characters!");
			return false;
		}
		if (title.length === 0) {
			console.log("Error! The title cannot be blank!");
			return false;
		}

		return true;
	};

	const addNote = () => {
		const isValid = isValidFileName(fileName) && isValidContent(content);
		if (isValid) {
			const newNote = {
				filename: fileName,
				content: content,
			};
			postGist(newNote);
			setNotes([...notes, newNote]);
			setFileName("");
			setContent("");
		}
	};

	const deleteNote = (filename: string) => {
		const updatedNotes = notes.filter(
			(note: Note) => note.filename !== filename
		);
		setNotes(updatedNotes);
		deleteGist(filename);
	};

	const deleteAll = () => {
		deleteAllGist(notes);
		setNotes([]);
		setFileName("");
		setContent("");
		setTitle("");
	};

	const save = () => {
		// do check
		const isValid = isValidTitle(title);
		if (isValid) {
			updateGist(title, notes);
		}
	};

	const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		isValidFileName(e.target.value);
		setFileName(e.target.value);
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		isValidContent(e.target.value);
		setContent(e.target.value);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		isValidTitle(e.target.value);
		setTitle(e.target.value);
	};

	const handleFileName2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		// isValidFileName(e.target.value);
		// notes[0].fileName = e.target.value;
	};

	return (
		<div className="wrapper">
			<div className="container-fluid">
				<p id="main-title">Notepad Application</p>
				<div className="content-section">
					<div className="form-container">
						<TopPanel
							title={title}
							handleTitleChange={handleTitleChange}
							deleteAll={deleteAll}
							save={save}
						/>
						<div id="myNotesTitle">My Notes</div>
						<NoteSection
							fileName={fileName}
							content={content}
							addNote={addNote}
							handleFileNameChange={handleFileNameChange}
							handleContentChange={handleContentChange}
						/>
						{sortedNotes.sort().map((note: Note) => (
							<NoteSection
								key={note.filename}
								fileName={note.filename}
								content={note.content}
								deleteNote={deleteNote}
								handleFileNameChange={handleFileName2Change}
								handleContentChange={handleContentChange}
								readOnly
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
