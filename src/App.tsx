import React, { useEffect, useState } from "react";
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

/*
	I hid my github access key inside a .env
	
	Future plans:
	- I would have like to use Formik and yup validation so I can display the error messages below the text fields
	- I need to look into displaying data from local storage
	- Need to do some more testing. Probably use Jest
*/

const App = () => {
	const [data, setData] = useState<any>([]);
	const [notes, setNotes] = useState<Note[]>([]);
	const [title, setTitle] = useState("");
	const [filename, setFilename] = useState("");
	const [content, setContent] = useState("");
	const maxTitleCharacterLimit = 255;
	const maxNoteCharacterLimit = 1000;

	// Fetches Data
	useEffect(() => {
		fetchGists().then((reponse: any) => {
			if (reponse) {
				setTitle(reponse.description);
				setData(Object.entries(reponse.files).map(([key, value]) => value));
			}
		});
	}, []);

	// Gets data and creates notes
	useEffect(() => {
		setNotes(
			data.map((note: Note) => {
				return {
					orginalFilename: note.filename,
					filename: note.filename,
					content: note.content,
				};
			})
		);
	}, [data]);

	// Stored data to the local storage. I'm having issues displaying it
	useEffect(() => {
		localStorage.setItem("notepad-title", JSON.stringify(title));
	}, [title]);

	useEffect(() => {
		localStorage.setItem("notepad-data", JSON.stringify(data));
	}, [data]);

	// Validation for Title
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

	// Validation for Filename
	const isValidFileName = (title: string, compareTitle: boolean) => {
		const isTitleInNotes = notes.some((note: Note) => title === note.filename);

		if (compareTitle) {
			if (isTitleInNotes) {
				console.log("Error! The Note title needs to be unique!");
				return false;
			}
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

	// Validation for Content
	const isValidContent = (note: string) => {
		if (note.length > maxNoteCharacterLimit) {
			console.log("Error! The note is over 1000 characters!");
			return false;
		}
		if (note.length === 0) {
			console.log("Error! The note cannot be blank!");
			return false;
		}

		return true;
	};

	// Checks if the Notes all have unique filenames
	const checkIfNotesAreUnique = () => {
		const filenameArray = notes.map((elm) => elm.filename);
		return filenameArray.length === new Set(filenameArray).size;
	};

	// Adds a new note
	const addNote = () => {
		const isValid = isValidFileName(filename, true) && isValidContent(content);
		if (isValid) {
			const newNote = {
				orginalFilename: filename,
				filename: filename,
				content: content,
			};
			postGist(newNote);
			setNotes([...notes, newNote]);
			setFilename("");
			setContent("");
		}
	};

	// Deletes a note
	const deleteNote = (filename: string) => {
		const updatedNotes = notes.filter(
			(note: Note) => note.orginalFilename !== filename
		);
		setNotes(updatedNotes);
		deleteGist(filename);
	};

	// Deletes all notes
	const deleteAllNotes = () => {
		deleteAllGist(notes);
		setNotes([]);
		setFilename("");
		setContent("");
		setTitle("");
	};

	// Save notepad data
	const saveNotes = () => {
		const isTitleValid = isValidTitle(title);
		const checkNotes = notes.some(
			(note: Note) => isValidContent(note.content) === false
		);
		const checkFileName = notes.some(
			(note: Note) => isValidFileName(note.filename, false) === false
		);

		if (!checkIfNotesAreUnique()) {
			console.log("Error! The Note title needs to be unique!");
			return null;
		}

		if (notes.length === 0) {
			console.log("Error! At least one note is required!");
			return null;
		}

		if (isTitleValid && !checkNotes && !checkFileName) {
			updateGist(title, notes);
			// I was having issues with the delete button and this line fixed the issue.
			// It fixed it but I don't think it's a good solution and I would like to find a better one
			setTimeout(() => window.location.reload(), 1000);
		}
	};

	// Handle title changes
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		isValidTitle(e.target.value);
		setTitle(e.target.value);
	};

	// Handle filename changes
	const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		isValidFileName(e.target.value, true);
		setFilename(e.target.value);
	};

	// Handle content changes
	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		isValidContent(e.target.value);
		setContent(e.target.value);
	};

	// Handle the filenames in notes changes
	const handleStoredFileNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		isValidFileName(e.target.value, true);
		let array = [...notes];
		for (let i in array) {
			if (array[i].orginalFilename === e.target.name) {
				array[i].filename = e.target.value;
				setNotes(array);
				break;
			}
		}
	};

	// Handle the content in notes changes
	const handleStoredContentChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		isValidContent(e.target.value);
		let array = [...notes];
		for (let i in array) {
			if (array[i].orginalFilename === e.target.name) {
				array[i].content = e.target.value;
				setNotes(array);
				break;
			}
		}
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
							deleteAll={deleteAllNotes}
							save={saveNotes}
						/>
						<div id="myNotesTitle">My Notes</div>
						<NoteSection
							name="blankNote"
							filename={filename}
							content={content}
							addNote={addNote}
							handleFileNameChange={handleFileNameChange}
							handleContentChange={handleContentChange}
						/>
						{notes.map((note: Note) => (
							<NoteSection
								name={note.orginalFilename}
								key={note.orginalFilename}
								filename={note.filename}
								content={note.content}
								deleteNote={deleteNote}
								handleFileNameChange={handleStoredFileNameChange}
								handleContentChange={handleStoredContentChange}
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
