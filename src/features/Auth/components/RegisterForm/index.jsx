import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from 'components/FormFields/InputField'
import { Button, CircularProgress, Typography } from '@mui/material'
import PasswordField from 'components/FormFields/PasswordField'

RegisterForm.propTypes = {
	onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
	onSubmit: null,
}

function RegisterForm({ onSubmit }) {
	const schema = yup
		.object({
			fullName: yup
				.string()
				.required('Full name is required!')
				.test(
					'at-least-two-words',
					'You must enter at least two words',
					value => value.split(' ').length >= 2
				),
			email: yup
				.string()
				.email('Your email is not valid!')
				.required('Email is required!'),
			password: yup
				.string()
				.required('Password is required!')
				.min(6, 'Your password must be at least 6-32 characters!')
				.max(32, 'Your password must be at least 6-32 characters!'),
			retypePassword: yup
				.string()
				.required('Retype password is required!')
				.oneOf([yup.ref('password')], 'Password is not match!'),
		})
		.required()

	const form = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			retypePassword: '',
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
				Create An Account
			</Typography>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<InputField name="fullName" form={form} label="Full Name" />
				<InputField name="email" form={form} label="Email" />
				<PasswordField name="password" form={form} label="Password" />
				<PasswordField
					name="retypePassword"
					form={form}
					label="Retype Password"
				/>
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
					{formState.isSubmitting ? <CircularProgress size={25} /> : 'Sign Up'}
				</Button>
			</form>
		</div>
	)
}

export default RegisterForm
