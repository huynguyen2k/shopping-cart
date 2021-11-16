import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

PasswordField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	disabled: PropTypes.bool,
}

PasswordField.defaultProps = {
	label: '',
	disabled: false,
}

function PasswordField(props) {
	const { name, form, label, disabled } = props
	const { control } = form
	const { field, fieldState } = useController({ name, control })

	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(value => !value)
	}

	return (
		<>
			<FormControl
				fullWidth
				variant="outlined"
				margin="normal"
				disabled={disabled}
				error={fieldState.invalid}
			>
				<InputLabel htmlFor={name}>{label}</InputLabel>
				<OutlinedInput
					id={name}
					type={showPassword ? 'text' : 'password'}
					label={label}
					{...field}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={togglePassword}
								edge="end"
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
				<FormHelperText error={fieldState.invalid}>
					{fieldState.error?.message}
				</FormHelperText>
			</FormControl>
		</>
	)
}

export default PasswordField
