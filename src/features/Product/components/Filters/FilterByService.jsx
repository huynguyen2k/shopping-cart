import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	Typography,
} from '@mui/material'

FilterByService.propTypes = {
	filters: PropTypes.object,
	onChange: PropTypes.func,
}

FilterByService.defaultProps = {
	filters: null,
	onChange: null,
}

function FilterByService({ filters, onChange }) {
	const handleServiceChange = e => {
		if (!onChange) return

		const { name, checked } = e.target
		onChange(name, checked)
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
				DỊCH VỤ
			</Typography>
			<FormGroup>
				{[
					{ value: 'isFreeShip', label: 'Giao miễn phí' },
					{ value: 'isPromotion', label: 'Đang giảm giá' },
				].map(service => (
					<FormControlLabel
						key={service.value}
						control={
							<Checkbox
								name={service.value}
								checked={!!filters[service.value]}
								color="primary"
								onChange={handleServiceChange}
							/>
						}
						label={service.label}
					/>
				))}
			</FormGroup>
		</Box>
	)
}

export default FilterByService
