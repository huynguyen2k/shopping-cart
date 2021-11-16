import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import FilterByCategory from './Filters/FilterByCategory'
import FilterByPrice from './Filters/FilterByPrice'
import FilterByService from './Filters/FilterByService'

ProductFilters.propTypes = {
	filters: PropTypes.object,
	onChange: PropTypes.func,
}

ProductFilters.defaultProps = {
	filters: null,
	onChange: null,
}

function ProductFilters({ filters, onChange }) {
	const handleFiltersChange = values => {
		if (!onChange) return

		const newFilters = {
			...filters,
			...values,
		}
		onChange(newFilters)
	}

	const handleServiceChange = (name, value) => {
		if (value) {
			onChange({
				...filters,
				[name]: value,
			})
			return
		}
		const newFilters = { ...filters }
		delete newFilters[name]
		onChange(newFilters)
	}

	return (
		<Box padding="16px">
			<FilterByCategory onChange={handleFiltersChange} />
			<FilterByPrice onChange={handleFiltersChange} />
			<FilterByService filters={filters} onChange={handleServiceChange} />
		</Box>
	)
}

export default ProductFilters
