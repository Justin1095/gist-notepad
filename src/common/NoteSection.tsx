interface Props {
	name: string;
	filename: string;
	content: string;
	addNote?: () => void;
	deleteNote?: (filename: string) => void;
	handleFileNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	readOnly?: boolean;
}

const NoteSection = ({
	name,
	filename,
	content,
	addNote,
	deleteNote,
	handleFileNameChange,
	handleContentChange,
}: Props) => {
	return (
		<div>
			<div className="row">
				<div className="col-4">
					<input
						type="text"
						name={name}
						value={filename}
						placeholder="Enter note title..."
						onChange={handleFileNameChange}
					/>
					{deleteNote && (
						<button className="deleteBtn" onClick={() => deleteNote(name)}>
							Delete
						</button>
					)}
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<textarea
						rows={4}
						name={name}
						value={content}
						placeholder="Enter note..."
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
