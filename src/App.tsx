import React, { useEffect, useState } from "react";
import { fetchNotes } from "./Api";
import "./App.css";
import NoteSection from "./common/NoteSection";
import TopPanel from "./common/TopPanel";
import { Note } from "./types";


const App = () => {
	const [notes, setNotes] = useState<any>();
	const [gistInfo, setGistInfo] = useState<any>();

	useEffect(() => {
		fetchNotes().then((reponse) => {
			if (reponse) {
				setGistInfo(reponse);
				const notesArray = Object.entries(reponse.files);
				setNotes(notesArray.map((note: any) => note[1]));
			}
		});
	}, []);

	return (
		<div className="wrapper">
			{notes && (
				<div className="container-fluid">
					<p id="main-title">Notepad Application</p>
					<div className="content-section">
						<div className="form-container">
							<TopPanel />
							<div id="myNotesTitle">My Notes</div>
							<NoteSection includeAddBtn />
							{notes.map((note: Note) => (
								<NoteSection values={note} includeDeleteBtn />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
