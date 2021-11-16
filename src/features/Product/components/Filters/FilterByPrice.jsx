import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'

FilterByPrice.propTypes = {
	onChange: PropTypes.func,
}

FilterByPrice.defaultProps = {
	onChange: null,
}

function parseLocaleNumber(stringNumber, locale) {
	const thousandSeparator = Intl.NumberFormat(locale)
		.format(11111)
		.replace(/\p{Number}/gu, '')
	const decimalSeparator = Intl.NumberFormat(locale)
		.format(1.1)
		.replace(/\p{Number}/gu, '')

	return parseFloat(
		stringNumber
			.replace(new RegExp('\\' + thousandSeparator, 'g'), '')
			.replace(new RegExp('\\' + decimalSeparator), '.')
	)
}

function FilterByPrice({ onChange }) {
	const [values, setValues] = useState({
		salePrice_gte: 0,
		salePrice_lte: 0,
	})

	const handleSubmit = () => {
		if (onChange) {
			onChange(values)
		}
		setValues({
			salePrice_gte: 0,
			salePrice_lte: 0,
		})
	}

	const handleChange = e => {
		let { name, value } = e.target
		value = parseLocaleNumber(value)
		value = Number.isNaN(value) ? 0 : value

		setValues(prevValues => ({
			...prevValues,
			[name]: value,
		}))
	}

	return (
		<Box mt="16px">
			<Typography
				variant="h5"
				sx={{
					fontSize: '1rem',
					fontWeight: '500',
				}}
			>
				GIÁ
			</Typography>

			<Box display="flex" alignItems="center" m="8px 0">
				<TextField
					label="Giá min"
					name="salePrice_gte"
					size="small"
					onChange={handleChange}
					value={new Intl.NumberFormat('de-DE').format(values.salePrice_gte)}
				/>
				<span
					style={{
						display: 'inline-block',
						margin: '0 4px',
						width: '20px',
						height: '1px',
						backgroundColor: '#555',
					}}
				></span>
				<TextField
					label="Giá max"
					name="salePrice_lte"
					size="small"
					onChange={handleChange}
					value={new Intl.NumberFormat('de-DE').format(values.salePrice_lte)}
				/>
			</Box>

			<Button variant="outlined" color="primary" onClick={handleSubmit}>
				Áp dụng
			</Button>
		</Box>
	)
}

export default FilterByPrice
