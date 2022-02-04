import { Note } from "../types";

interface Props {
	values?: Note;
	includeAddBtn?: boolean;
	includeDeleteBtn?: boolean;
}

const NoteSection = ({ values, includeAddBtn, includeDeleteBtn }: Props) => {
	return (
		<div>
			<div className="row">
				<div className="col-4">
					<input
						type="text"
						// value={values?.filename || ""}
						placeholder="Enter note title..."
						defaultValue={values?.filename || ""}
					/>
					{includeDeleteBtn && <button className="deleteBtn">Delete</button>}
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<textarea
						rows={4}
						// value={values?.content || ""}
						placeholder="Enter note..."
						defaultValue={values?.content || ""}
					/>
				</div>
			</div>
			{includeAddBtn && <button className="addBtn">Add</button>}
		</div>
	);
};

export default NoteSection;
