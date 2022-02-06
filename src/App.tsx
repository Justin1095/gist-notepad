import React, { useEffect, useState } from "react";
import { fetchNotes } from "./Api";
import "./App.css";
import NoteSection from "./common/NoteSection";
import TopPanel from "./common/TopPanel";
import { Note } from "./types";

const App = () => {
	const [notes, setNotes] = useState<any>([]);
	const [gistInfo, setGistInfo] = useState<any>();
	const [title, setTitle] = useState("");
	const [fileName, setFileName] = useState("");
	const [content, setContent] = useState("");
	const maxTitleCharacterLimit = 255;
	const maxNoteCharacterLimit = 1000;

	useEffect(() => {
		fetchNotes().then((reponse: any) => {
			if (reponse) {
				setGistInfo(reponse);
				setTitle(reponse.description);
				setNotes(Object.entries(reponse.files).map(([key, value]) => value));
			}
		});
	}, []);

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
			console.log("Error! The note is over 255 characters!");
			return false;
		}
		if (title.length === 0) {
			console.log("Error! The note cannot be blank!");
			return false;
		}

		return true;
	};

	const addNote = () => {
		const isValid = isValidFileName(fileName) && isValidContent(content);
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

	const deleteNote = (filename: string) => {
		const updatedNotes = notes.filter(
			(note: Note) => note.filename !== filename
		);
		setNotes(updatedNotes);
	};

	const deleteAll = () => {
		setNotes([]);
		setFileName("");
		setContent("");
		setTitle("");
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
						/>
						<div id="myNotesTitle">My Notes</div>
						<NoteSection
							fileName={fileName}
							content={content}
							addNote={addNote}
							handleFileNameChange={handleFileNameChange}
							handleContentChange={handleContentChange}
						/>
						{notes.map((note: Note) => (
							<NoteSection
								fileName={note.filename}
								content={note.content}
								deleteNote={deleteNote}
								handleFileNameChange={handleFileNameChange}
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
