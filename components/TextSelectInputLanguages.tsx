import React from 'react'
import consts from '../utils/constants'

export default function TextSelectInputLanguages({
	additionalStyles,
}: {
	additionalStyles?: string
}) {
	return (
		<div className={`flex flex-row ${additionalStyles}`}>
			<label>
				<input
					type="text"
					placeholder="Algorithm"
					className="min-h-full rounded-l-md px-2 py-1"
				/>
			</label>
			<label>
				<select
					name="language"
					id="language"
					className="h-full rounded-r-md border-l-2 overflow-hidden"
				>
					{consts.VALID_LANGUAGES.map((v) => (
						<option value={v} key={v}>
							{v}
						</option>
					))}
				</select>
			</label>
		</div>
	)
}
