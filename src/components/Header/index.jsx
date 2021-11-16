import * as React from 'react'
import { makeStyles } from '@mui/styles'
// COMPONENTS
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useHistory } from 'react-router-dom'
import { Badge, Dialog, DialogContent, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import Register from 'features/Auth/components/Register'
import { Alert, Snackbar } from '@mui/material'
import Login from 'features/Auth/components/Login'
import { useSelector } from 'react-redux'
import { AccountCircle, ShoppingCart } from '@mui/icons-material'
import { logout } from 'features/Auth/authSlice'
import { useDispatch } from 'react-redux'
import { cartItemsCountSelector } from 'features/Cart/selectors'

const useStyles = makeStyles({
	link: {
		color: 'white',
		textDecoration: 'none',
	},
})

const MODE = {
	LOGIN: 'login',
	REGISTER: 'register',
}

function Header() {
	const classes = useStyles()
	const history = useHistory()

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const cartItemsCount = useSelector(cartItemsCountSelector)

	const [anchorEl, setAnchorEl] = useState(null)
	const [open, setOpen] = useState(false)
	const [mode, setMode] = useState(MODE.LOGIN)
	const [message, setMessage] = useState({
		open: false,
		type: '',
		success: '',
	})

	const handleUserClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSuccessRegister = () => {
		setOpen(false)
		setMessage({
			open: true,
			type: 'success',
			content: 'You have successfully registered an account!',
		})
	}

	const handleFailRegister = error => {
		setMessage({
			open: true,
			type: 'error',
			content: error,
		})
	}

	const handleSuccessLogin = () => {
		setOpen(false)
	}

	const handleFailLogin = error => {
		setMessage({
			open: true,
			type: 'error',
			content: error,
		})
	}

	const handleMessageClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setMessage({ open: false, type: '', success: '' })
	}

	const handleLogoutClick = () => {
		const action = logout()
		dispatch(action)
	}

	const handleCartClick = () => {
		history.push('/cart')
	}

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							<Link className={classes.link} to="/">
								TIKI
							</Link>
						</Typography>

						{!user && (
							<Button color="inherit" onClick={handleClickOpen}>
								Login
							</Button>
						)}

						{!!user && (
							<>
								<IconButton color="inherit" onClick={handleUserClick}>
									<AccountCircle />
								</IconButton>
								<Menu
									open={Boolean(anchorEl)}
									anchorEl={anchorEl}
									onClose={handleCloseMenu}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
								>
									<MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
									<MenuItem onClick={handleCloseMenu}>My account</MenuItem>
									<MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
								</Menu>
							</>
						)}

						<IconButton size="large" color="inherit" onClick={handleCartClick}>
							<Badge badgeContent={cartItemsCount} color="error">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>

			<Dialog
				open={open}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<IconButton
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>

				<DialogContent>
					{mode === MODE.LOGIN && (
						<>
							<Login
								onSuccessSubmit={handleSuccessLogin}
								onFailSubmit={handleFailLogin}
							/>
							<Box textAlign="center" marginTop="16px">
								<Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
									Dont have an account. Register here
								</Button>
							</Box>
						</>
					)}

					{mode === MODE.REGISTER && (
						<>
							<Register
								onSuccessSubmit={handleSuccessRegister}
								onFailSubmit={handleFailRegister}
							/>
							<Box textAlign="center" marginTop="16px">
								<Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
									Already have an account. Login here
								</Button>
							</Box>
						</>
					)}
				</DialogContent>
			</Dialog>

			{message.open && (
				<Snackbar
					open={message.open}
					autoHideDuration={6000}
					onClose={handleMessageClose}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					key={message.content}
				>
					<Alert
						variant="filled"
						onClose={handleMessageClose}
						severity={message.type}
						sx={{ width: '100%' }}
					>
						{message.content}
					</Alert>
				</Snackbar>
			)}
		</>
	)
}

export default Header
