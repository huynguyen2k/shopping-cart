import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import RegisterForm from '../RegisterForm'
import { register } from 'features/Auth/authSlice'

Register.propTypes = {
	onSuccessSubmit: PropTypes.func,
	onFailSubmit: PropTypes.func,
}

Register.defaultProps = {
	onSuccessSubmit: null,
	onFailSubmit: null,
}

function Register({ onSuccessSubmit, onFailSubmit }) {
	const dispatch = useDispatch()

	const handleSubmit = async data => {
		try {
			data.username = data.email
			const action = register(data)
			await dispatch(action).unwrap()

			if (onSuccessSubmit) {
				onSuccessSubmit()
			}
		} catch (error) {
			if (onFailSubmit) {
				onFailSubmit(error)
			}
		}
	}

	return (
		<>
			<RegisterForm onSubmit={handleSubmit} />
		</>
	)
}

export default Register
