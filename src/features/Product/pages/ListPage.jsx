import React, { useState, useEffect, useMemo } from 'react'
import { Box } from '@mui/system'
import { Container, Grid, Pagination, Paper } from '@mui/material'
import productApi from 'api/productApi'
import ProductSkeletonList from '../components/ProductSkeletonList'
import ProductList from '../components/ProductList'
import ProductSort from '../components/ProductSort'
import ProductFilters from '../components/ProductFilters'
import FilterViewer from '../components/FilterViewer'
import { useHistory, useLocation } from 'react-router'
import queryString from 'query-string'

function ListPage() {
	const history = useHistory()
	const location = useLocation()

	const queryParams = useMemo(() => {
		const params = queryString.parse(location.search)
		const newParams = {
			...params,
			_page: parseInt(params._page) || 1,
			_limit: parseInt(params._limit) || 12,
			_sort: params._sort || 'salePrice:ASC',
		}

		if (newParams.hasOwnProperty('isPromotion')) {
			newParams.isPromotion = params.isPromotion === 'true'
		}
		if (newParams.hasOwnProperty('isFreeShip')) {
			newParams.isFreeShip = params.isFreeShip === 'true'
		}
		if (newParams.hasOwnProperty('salePrice_gte')) {
			newParams.salePrice_gte = parseInt(newParams.salePrice_gte)
		}
		if (newParams.hasOwnProperty('salePrice_lte')) {
			newParams.salePrice_lte = parseInt(newParams.salePrice_lte)
		}
		return newParams
	}, [location.search])

	const [loading, setLoading] = useState(true)
	const [productList, setProductList] = useState([])
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 12,
		total: 12,
	})

	useEffect(() => {
		;(async () => {
			setLoading(true)
			try {
				const { data, pagination } = await productApi.getAll(queryParams)
				setProductList(data)
				setPagination(pagination)
			} catch (error) {
				console.log('Failed to fetch product list: ', error)
			}
			setLoading(false)
		})()
	}, [queryParams])

	const handlePageChange = (e, page) => {
		const newParams = {
			...queryParams,
			_page: page,
		}
		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(newParams),
		})
	}

	const handleSortChange = newSortValue => {
		const newParams = {
			...queryParams,
			_sort: newSortValue,
		}
		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(newParams),
		})
	}

	const handleFiltersChange = newFilters => {
		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(newFilters),
		})
	}

	return (
		<Box>
			<Container>
				<Grid container spacing={1}>
					<Grid item flexBasis="250px">
						<Paper elevation={0}>
							<ProductFilters
								filters={queryParams}
								onChange={handleFiltersChange}
							/>
						</Paper>
					</Grid>
					<Grid item flex="1 0 0">
						<Paper elevation={0}>
							<ProductSort
								currentSort={queryParams._sort}
								onChange={handleSortChange}
							/>

							<FilterViewer
								filters={queryParams}
								onChange={handleFiltersChange}
							/>

							{loading ? (
								<ProductSkeletonList number={12} />
							) : (
								<ProductList data={productList} />
							)}

							<Pagination
								page={pagination.page}
								count={Math.ceil(pagination.total / pagination.limit)}
								color="primary"
								boundaryCount={1}
								siblingCount={1}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									padding: '32px 0',
								}}
								onChange={handlePageChange}
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default ListPage
