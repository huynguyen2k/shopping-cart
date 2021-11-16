import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
	baseURL: 'https://api.ezfrontend.com',
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosClient.interceptors.response.use(
	response => {
		return response && response.data
	},
	error => {
		return Promise.reject(error?.response?.data)
	}
)

export default axiosClient
