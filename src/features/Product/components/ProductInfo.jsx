import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { formatPrice } from 'utils'
import { grey } from '@mui/material/colors'

ProductInfo.propTypes = {
	product: PropTypes.object,
}

const styles = {
	root: {
		color: '#555',
		marginBottom: '32px',
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: '400',
	},
	description: {
		margin: '8px 0',
		fontSize: '0.875rem',
		fontWeight: '400',
	},
	priceBox: {
		borderRadius: '4px',
		padding: '8px 16px',
		backgroundColor: grey[100],
	},
	salePrice: {
		fontSize: '1.5rem',
		fontWeight: '500',
	},
	originalPrice: {
		fontSize: '1.25rem',
		fontWeight: '400',
		textDecoration: 'line-through',
		margin: '0 16px',
	},
	promotionPercent: {
		fontSize: '1.25rem',
		fontWeight: '400',
	},
}

function ProductInfo({ product = {} }) {
	const { name, shortDescription, salePrice, originalPrice, promotionPercent } =
		product

	return (
		<Box sx={styles.root}>
			<Typography variant="subtitle1" sx={styles.title}>
				{name}
			</Typography>

			<Typography variant="subtitle2" sx={styles.description}>
				{shortDescription}
			</Typography>

			<Box sx={styles.priceBox}>
				<Box component="span" sx={styles.salePrice}>
					{formatPrice(salePrice)}
				</Box>

				{promotionPercent > 0 && (
					<>
						<Box component="span" sx={styles.originalPrice}>
							{formatPrice(originalPrice)}
						</Box>
						<Box component="span" sx={styles.promotionPercent}>
							-{promotionPercent}%
						</Box>
					</>
				)}
			</Box>
		</Box>
	)
}

export default ProductInfo
