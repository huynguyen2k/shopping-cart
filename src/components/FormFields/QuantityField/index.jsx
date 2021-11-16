import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/system'
import {
	FormHelperText,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'

QuantityField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	disabled: PropTypes.bool,
}

QuantityField.defaultProps = {
	label: '',
	disabled: false,
}

const styles = {
	quantity: {
		display: 'flex',
		alignItems: 'center',
	},
}

function QuantityField(props) {
	const textFieldRef = useRef(null)
	const { name, form, label, disabled } = props
	const { control, setValue } = form
	const { field, fieldState } = useController({ name, control })

	const handleValueChange = e => {
		let { name, value } = e.target
		value = parseInt(value)

		if (Number.isNaN(value) || value <= 0) {
			value = 1
		}
		setValue(name, value)
	}

	const handleClick = value => {
		handleValueChange({
			target: {
				name,
				value: field.value + value,
			},
		})
	}

	return (
		<Box>
			<Typography>{label}</Typography>

			<Box sx={styles.quantity}>
				<IconButton onClick={() => handleClick(-1)}>
					<RemoveIcon />
				</IconButton>

				<TextField
					type="number"
					variant="outlined"
					size="small"
					margin="none"
					disabled={disabled}
					error={fieldState.invalid}
					sx={{
						width: '100px',
						'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':
							{
								WebkitAppearance: 'none',
							},
					}}
					{...field}
					onChange={handleValueChange}
					ref={textFieldRef}
				/>

				<IconButton onClick={() => handleClick(1)}>
					<AddIcon />
				</IconButton>
			</Box>

			<FormHelperText error>{fieldState.error?.message}</FormHelperText>
		</Box>
	)
}

export default QuantityField
