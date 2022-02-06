interface Props {
	notePadTitle: string;
}

const TopPanel = ({ notePadTitle }: Props) => {
	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	return "test";
	// };

	return (
		<div>
			<div className="row">
				<div className="col-12">
					<div className="div-right">
						<button className="saveBtn">Save</button>
						<button className="deleteBtn">Delete</button>
					</div>
					<div id="notepad-title">Notepad Title</div>

					<input
						id="notepad-title-input"
						type="text"
						value={notePadTitle}
						placeholder="My notepad title.."
					/>
				</div>
			</div>
		</div>
	);
};

export default TopPanel;
