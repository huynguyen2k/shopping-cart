import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'

ProductSort.propTypes = {
	currentSort: PropTypes.string,
	onChange: PropTypes.func,
}

ProductSort.defaultProps = {
	currentSort: 'salePrice:ASC',
	onChange: null,
}

function ProductSort({ currentSort, onChange }) {
	const handleSortChange = (event, newValue) => {
		if (onChange) {
			onChange(newValue)
		}
	}

	return (
		<Box>
			<Tabs value={currentSort} onChange={handleSortChange}>
				<Tab value="salePrice:ASC" label="Giá thấp đến cao" />
				<Tab value="salePrice:DESC" label="Giá cao đến thấp" />
			</Tabs>
		</Box>
	)
}

export default ProductSort
