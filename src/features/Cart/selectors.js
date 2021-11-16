import { createSelector } from '@reduxjs/toolkit'

const cartItemsSelector = state => state.cart.cartItems

export const cartItemsCountSelector = createSelector(
	cartItemsSelector,
	cartItems => cartItems.reduce((result, item) => result + item.quantity, 0)
)

export const cartTotalSelector = createSelector(cartItemsSelector, cartItems =>
	cartItems.reduce(
		(result, item) => result + item.product.salePrice * item.quantity,
		0
	)
)
