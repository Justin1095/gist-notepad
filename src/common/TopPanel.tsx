interface Props {
	title: string;
	handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	deleteAll: () => void;
}

const TopPanel = ({ title, handleTitleChange, deleteAll }: Props) => {
	return (
		<div>
			<div className="row">
				<div className="col-12">
					<div className="div-right">
						<button className="saveBtn">Save</button>
						<button className="deleteBtn" onClick={deleteAll}>
							Delete
						</button>
					</div>
					<div id="notepad-title">Notepad Title</div>

					<input
						id="notepad-title-input"
						type="text"
						value={title}
						placeholder="My notepad title.."
						onChange={handleTitleChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default TopPanel;
