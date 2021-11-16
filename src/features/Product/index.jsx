import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import ListPage from './pages/ListPage'
import NotFound from 'components/NotFound'
import DetailPage from './pages/DetailPage'
import { Box } from '@mui/material'

function ProductFeature() {
	const match = useRouteMatch()

	return (
		<Box pt={4}>
			<Switch>
				<Route exact path={match.path} component={ListPage} />
				<Route path={`${match.path}/:productId`} component={DetailPage} />
				<Route component={NotFound} />
			</Switch>
		</Box>
	)
}

export default ProductFeature
