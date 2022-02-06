import React, { useEffect, useState } from "react";
import { fetchNotes } from "./Api";
import "./App.css";
import NoteSection from "./common/NoteSection";
import TopPanel from "./common/TopPanel";
import { Note } from "./types";

/*
- add formik and submit
- make the buttons do stuff
- add error check
- update types.ts
*/

const App = () => {
	const [notes, setNotes] = useState<any>();
	const [gistInfo, setGistInfo] = useState<any>();

	const [notePadTitle, setNotePadTitle] = useState("");

	useEffect(() => {
		fetchNotes().then((reponse: any) => {
			if (reponse) {
				setGistInfo(reponse);
				setNotes(Object.entries(reponse.files).map(([key, value]) => value));
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
							<TopPanel notePadTitle={notePadTitle} />
							<div id="myNotesTitle">My Notes</div>
							<NoteSection notes={notes} setNotes={setNotes} includeAddBtn />
							{notes.map((note: Note) => (
								<NoteSection
									value={note}
									notes={notes}
									setNotes={setNotes}
									includeDeleteBtn
									readOnly
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
