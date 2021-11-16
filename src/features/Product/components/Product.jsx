import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index'
import { useHistory } from 'react-router'
import { formatPrice } from 'utils'

Product.propTypes = {
	product: PropTypes.object,
}

Product.defaultProps = {
	product: null,
}

function Product({ product }) {
	const history = useHistory()

	const handleClick = () => {
		history.push(`/products/${product.id}`)
	}

	if (!product) return null
	return (
		<Box
			padding={1}
			sx={{
				cursor: 'pointer',
				userSelect: 'none',
			}}
			onClick={handleClick}
		>
			<img
				src={`${
					product.thumbnail?.url
						? `${STATIC_HOST}${product.thumbnail.url}`
						: THUMBNAIL_PLACEHOLDER
				}`}
				alt={product.name}
				style={{
					width: '100%',
					height: '150px',
					objectFit: 'cover',
					borderRadius: '4px',
				}}
			/>
			<Typography variant="body2">{product.name}</Typography>
			<Typography variant="body2">
				{formatPrice(product.salePrice)}
				{product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
			</Typography>
		</Box>
	)
}

export default Product
