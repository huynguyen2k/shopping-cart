import './App.css'
import Header from 'components/Header'
import { Switch, Route } from 'react-router-dom'
import ProductFeature from 'features/Product'
import NotFound from 'components/NotFound'
import CartFeature from 'features/Cart'

function App() {
	return (
		<div className="App">
			<Header />

			<Switch>
				<Route path="/products" component={ProductFeature} />
				<Route path="/cart" component={CartFeature} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default App
