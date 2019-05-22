import React from 'react'
import '../styles/page.css'

class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
	}

	_getPageComponent = (type, props) => {
		let Component = require(`../components/${type}`)[type]
		return <Component {...props} />
	}


	render() {
		return (
			<div className="page-root-container">
				{this._getPageComponent('Header1')}
			</div>
		)
	}
}

export default PageContainer