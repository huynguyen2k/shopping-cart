import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

ProductDescription.propTypes = {
	product: PropTypes.object,
}

function ProductDescription({ product = {} }) {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(product.description),
			}}
		/>
	)
}

export default ProductDescription
