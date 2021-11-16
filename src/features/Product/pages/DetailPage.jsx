import React from 'react'
import { Box } from '@mui/system'
import { Route, Switch, useParams, useRouteMatch } from 'react-router'
import { Container, Grid, Paper } from '@mui/material'
import ProductThumbnail from '../components/ProductThumbnail'
import useProductDetail from '../hooks/useProductDetail'
import ProductInfo from '../components/ProductInfo'
import AddToCartForm from '../components/AddToCartForm'
import DetailTabs from '../components/DetailTabs'
import ProductDescription from '../components/ProductDescription'
import ProductAdditional from '../components/ProductAdditional'
import ProductReviews from '../components/ProductReviews'
import { addToCart } from 'features/Cart/cartSlice'
import { useDispatch } from 'react-redux'

const leftGridStyles = {
	width: '400px',
	padding: '16px',
	borderRight: theme => `1px solid ${theme.palette.grey[300]}`,
}

const rightGridStyles = {
	flex: '1 0 0',
	padding: '16px',
}

function DetailPage() {
	const dispatch = useDispatch()
	const { productId } = useParams()
	const match = useRouteMatch()
	const { loading, product } = useProductDetail(productId)

	const handleAddToCartSubmit = formValues => {
		const action = addToCart({
			id: productId,
			product,
			quantity: formValues.quantity,
		})
		dispatch(action)
	}

	if (loading) {
		return <Box>Loading...</Box>
	}

	return (
		<Box>
			<Container>
				<Paper elevation={0}>
					<Grid container>
						<Grid item sx={leftGridStyles}>
							<ProductThumbnail product={product} />
						</Grid>

						<Grid item sx={rightGridStyles}>
							<ProductInfo product={product} />
							<AddToCartForm onSubmit={handleAddToCartSubmit} />
						</Grid>
					</Grid>
				</Paper>

				<DetailTabs />

				<Paper elevation={0}>
					<Switch>
						<Route exact path={`${match.path}`}>
							<ProductDescription product={product} />
						</Route>

						<Route exact path={`${match.path}/additional`}>
							<ProductAdditional />
						</Route>

						<Route exact path={`${match.path}/reviews`}>
							<ProductReviews />
						</Route>
					</Switch>
				</Paper>
			</Container>
		</Box>
	)
}

export default DetailPage
