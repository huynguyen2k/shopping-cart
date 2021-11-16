import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useEffect } from 'react'
import categoryApi from 'api/categoryApi'

FilterByCategory.propTypes = {
	onChange: PropTypes.func,
}

FilterByCategory.defaultProps = {
	onChange: null,
}

function FilterByCategory({ onChange }) {
	const [categoryList, setCategoryList] = useState([])

	useEffect(() => {
		;(async () => {
			try {
				const response = await categoryApi.getAll()
				setCategoryList(response)
			} catch (error) {
				console.log('Failed to fetch category list: ', error)
			}
		})()
	}, [])

	const handleCategoryClick = category => {
		if (onChange) {
			onChange({
				'category.id': category.id,
				'category.name': category.name,
			})
		}
	}

	return (
		<Box>
			<Typography
				variant="h5"
				sx={{
					fontSize: '1rem',
					fontWeight: '500',
				}}
			>
				DANH MỤC SẢN PHẨM
			</Typography>
			<ul
				style={{
					margin: '0',
					marginTop: '8px',
					padding: '0',
					listStyle: 'none',
				}}
			>
				{categoryList.map(category => (
					<li key={category.id} onClick={() => handleCategoryClick(category)}>
						<Typography
							variant="subtitle1"
							sx={{
								fontSize: '0.875rem',
								lineHeight: '1.6',
								cursor: 'pointer',
								userSelect: 'none',
								'&:hover': {
									color: theme => theme.palette.primary.main,
								},
							}}
						>
							{category.name}
						</Typography>
					</li>
				))}
			</ul>
		</Box>
	)
}

export default FilterByCategory
