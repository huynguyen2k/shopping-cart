import React from 'react'
import { Link, Box } from '@mui/material'
import { NavLink, useRouteMatch } from 'react-router-dom'

const styles = {
	box: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		alignItems: 'center',

		padding: '0',
		listStyle: 'none',

		'& > li > a': {
			display: 'inline-block',
			padding: '8px 16px',
			color: 'grey.700',
			textDecoration: 'none',

			'&:hover, &.active': {
				color: 'primary.main',
				textDecoration: 'underline',
			},
		},
	},
}

function DetailTabs() {
	const match = useRouteMatch()

	return (
		<Box component="ul" sx={styles.box}>
			<li>
				<Link exact component={NavLink} to={match.url}>
					Description
				</Link>
			</li>
			<li>
				<Link exact component={NavLink} to={`${match.url}/additional`}>
					Additional Information
				</Link>
			</li>
			<li>
				<Link exact component={NavLink} to={`${match.url}/reviews`}>
					Reviews
				</Link>
			</li>
		</Box>
	)
}

export default DetailTabs
