import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

ProductSkeletonList.propTypes = {
	number: PropTypes.number,
}

ProductSkeletonList.defaultProps = {
	number: 8,
}

function ProductSkeletonList({ number }) {
	return (
		<Box>
			<Grid container>
				{[...Array(number).keys()].map((item, index) => {
					return (
						<Grid key={index} item xs={12} sm={6} md={4} lg={3}>
							<Box padding={1}>
								<Skeleton
									animation="wave"
									variant="rectangular"
									width="100%"
									height="150px"
									sx={{
										borderRadius: '4px',
										mb: '8px',
									}}
								/>
								<Skeleton animation="wave" width="100%" />
								<Skeleton animation="wave" width="60%" />
							</Box>
						</Grid>
					)
				})}
			</Grid>
		</Box>
	)
}

export default ProductSkeletonList
