import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from '@mui/material'
import { Box } from '@mui/system'

FilterViewer.propTypes = {
	filters: PropTypes.object,
	onChange: PropTypes.func,
}

const FILTER_LIST = [
	{
		id: 1,
		getLabel: () => 'Giao hàng miễn phí',
		isActive: filters => !!filters.isFreeShip,
		isVisible: () => true,
		isRemovable: false,
		onRemove: () => {},
		onToggle: filters => {
			const newFilters = { ...filters }
			if (newFilters.isFreeShip) {
				delete newFilters.isFreeShip
			} else {
				newFilters.isFreeShip = true
			}
			return newFilters
		},
	},
	{
		id: 2,
		getLabel: () => 'Đang giảm giá',
		isActive: filters => !!filters.isPromotion,
		isVisible: filters => !!filters.isPromotion,
		isRemovable: true,
		onRemove: filters => {
			const newFilters = { ...filters }
			delete newFilters.isPromotion
			return newFilters
		},
		onToggle: () => {},
	},
	{
		id: 3,
		getLabel: filters =>
			`Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
		isActive: () => true,
		isVisible: filters => {
			return (
				Object.keys(filters).includes('salePrice_gte') &&
				Object.keys(filters).includes('salePrice_lte')
			)
		},
		isRemovable: true,
		onRemove: filters => {
			const newFilters = { ...filters }
			delete newFilters.salePrice_gte
			delete newFilters.salePrice_lte
			return newFilters
		},
		onToggle: () => {},
	},
	{
		id: 4,
		getLabel: filters => filters['category.name'],
		isActive: () => true,
		isVisible: filters => !!filters['category.id'],
		isRemovable: true,
		onRemove: filters => {
			const newFilters = { ...filters }
			delete newFilters['category.id']
			delete newFilters['category.name']
			return newFilters
		},
		onToggle: () => {},
	},
]

function FilterViewer({ filters = {}, onChange = null }) {
	const handleToggle = item => {
		if (!onChange) return

		const newFilters = item.onToggle(filters)
		onChange(newFilters)
	}

	const handleRemove = item => {
		if (!onChange) return

		const newFilters = item.onRemove(filters)
		onChange(newFilters)
	}

	return (
		<Box
			component="ul"
			sx={{
				display: 'flex',
				flexFlow: 'row wrap',
				alignItems: 'center',
				margin: '16px 0',
				padding: '0 8px',
				listStyle: 'none',
				'& li': {
					margin: '4px',
				},
			}}
		>
			{FILTER_LIST.filter(item => item.isVisible(filters)).map(item => (
				<li key={item.id}>
					<Chip
						label={item.getLabel(filters)}
						color={item.isActive(filters) ? 'primary' : 'default'}
						clickable={!item.isRemovable}
						onClick={() => handleToggle(item)}
						onDelete={item.isRemovable ? () => handleRemove(item) : null}
					/>
				</li>
			))}
		</Box>
	)
}

export default FilterViewer
