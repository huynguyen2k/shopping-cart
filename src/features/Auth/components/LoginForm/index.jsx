import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/FormFields/InputField'
import PasswordField from 'components/FormFields/PasswordField'
import { Button, CircularProgress, Typography } from '@mui/material'

LoginForm.propTypes = {
	onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
	onSubmit: null,
}

function LoginForm({ onSubmit }) {
	const schema = yup
		.object({
			identifier: yup
				.string()
				.email('Your email is not valid!')
				.required('Email is required!'),
			password: yup
				.string()
				.required('Password is required!')
				.min(6, 'Your password must be at least 6-32 characters!')
				.max(32, 'Your password must be at least 6-32 characters!'),
		})
		.required()

	const form = useForm({
		defaultValues: {
			identifier: '',
			password: '',
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
		<div>
			<Typography margin="16px 0" align="center" variant="h5">
				Sign In With Your Account
			</Typography>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<InputField name="identifier" form={form} label="Email" />
				<PasswordField name="password" form={form} label="Password" />
				<Button
					type="submit"
					variant="contained"
					size="large"
					fullWidth
					disabled={formState.isSubmitting}
					sx={{
						marginTop: '32px',
					}}
				>
					{formState.isSubmitting ? <CircularProgress size={25} /> : 'Sign In'}
				</Button>
			</form>
		</div>
	)
}

export default LoginForm
