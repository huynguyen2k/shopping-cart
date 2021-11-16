import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { STATIC_HOST } from 'constants/index'
import { THUMBNAIL_PLACEHOLDER } from 'constants/common'

ProductThumbnail.propTypes = {
	product: PropTypes.object,
}

function ProductThumbnail({ product = {} }) {
	return (
		<Box width="100%" paddingTop="100%" position="relative">
			<img
				src={`${
					product.thumbnail?.url
						? `${STATIC_HOST}${product.thumbnail.url}`
						: THUMBNAIL_PLACEHOLDER
				}`}
				alt={product.name}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					borderRadius: '4px',
				}}
			/>
		</Box>
	)
}

export default ProductThumbnail
