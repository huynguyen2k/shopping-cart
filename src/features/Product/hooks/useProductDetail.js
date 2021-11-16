import productApi from 'api/productApi'
import { useState, useEffect } from 'react'

export default function useProductDetail(productId) {
	const [loading, setLoading] = useState(true)
	const [product, setProduct] = useState({})

	useEffect(() => {
		;(async () => {
			try {
				setLoading(true)

				const result = await productApi.get(productId)
				setProduct(result)
			} catch (error) {
				console.log('Failed to fetch product detail: ', error)
			}
			setLoading(false)
		})()
	}, [productId])

	return { loading, product }
}
