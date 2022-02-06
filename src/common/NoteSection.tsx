interface Props {
	fileName: string;
	content: string;
	addNote?: () => void;
	deleteNote?: (filename: string) => void;
	handleFileNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	readOnly?: boolean;
}

const NoteSection = ({
	fileName,
	content,
	addNote,
	deleteNote,
	handleFileNameChange,
	handleContentChange,
	readOnly,
}: Props) => {
	return (
		<div>
			<div className="row">
				<div className="col-4">
					<input
						type="text"
						value={fileName}
						placeholder="Enter note title..."
						disabled={readOnly}
						onChange={handleFileNameChange}
					/>
					{deleteNote && (
						<button className="deleteBtn" onClick={() => deleteNote(fileName)}>
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
						onChange={handleContentChange}
					/>
				</div>
			</div>
			{addNote && (
				<button className="addBtn" onClick={addNote}>
					Add
				</button>
			)}
		</div>
	);
};

export default NoteSection;
