import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { TextField } from '@mui/material'

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	disabled: PropTypes.bool,
}

InputField.defaultProps = {
	label: '',
	disabled: false,
}

function InputField(props) {
	const { name, form, label, disabled } = props
	const { control } = form
	const { field, fieldState } = useController({ name, control })

	return (
		<>
			<TextField
				disabled={disabled}
				type="text"
				label={label}
				variant="outlined"
				margin="normal"
				fullWidth
				error={fieldState.invalid}
				helperText={fieldState.error?.message}
				{...field}
			/>
		</>
	)
}

export default InputField
