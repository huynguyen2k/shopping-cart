import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import QuantityField from 'components/FormFields/QuantityField'

AddToCartForm.propTypes = {
	onSubmit: PropTypes.func,
}

function AddToCartForm({ onSubmit = null }) {
	const schema = yup
		.object({
			quantity: yup
				.number()
				.required('Quantity is required!')
				.min(1, 'Quantity must be at least 1!'),
		})
		.required()

	const form = useForm({
		defaultValues: {
			quantity: 1,
		},
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: yupResolver(schema),
	})
	const { formState } = form

	const handleSubmit = async data => {
		if (onSubmit) {
			await onSubmit(data)
		}
	}

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<QuantityField name="quantity" form={form} label="Số lượng" />
			<Button
				type="submit"
				variant="contained"
				size="large"
				disabled={formState.isSubmitting}
				sx={{
					marginTop: '16px',
				}}
			>
				ADD TO CART
			</Button>
		</form>
	)
}

export default AddToCartForm
