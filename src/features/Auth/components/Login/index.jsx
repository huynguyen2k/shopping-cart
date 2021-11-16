import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import LoginForm from '../LoginForm'
import { login } from 'features/Auth/authSlice'

Login.propTypes = {
	onSuccessSubmit: PropTypes.func,
	onFailSubmit: PropTypes.func,
}

Login.defaultProps = {
	onSuccessSubmit: null,
	onFailSubmit: null,
}

function Login({ onSuccessSubmit, onFailSubmit }) {
	const dispatch = useDispatch()

	const handleSubmit = async data => {
		try {
			const action = login(data)
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
			<LoginForm onSubmit={handleSubmit} />
		</>
	)
}

export default Login
