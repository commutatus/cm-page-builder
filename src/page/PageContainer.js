import React from 'react'
import '../styles/page.css'

class PageContainer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
            pageComponents: ['Text', 'List_Num'],
            componentType: 'List'
        }
	}

	_getPageComponent = (type, index) => {
		let Component = require(`../components/${type}`)[type]
		return <Component key={`${type}-${index}`}/>
    }

    // _addPageComponent = () => {

    // }
    
	render() {
        const { pageComponents } = this.state
		return (
			<div className="page-root-container">
				{
                    pageComponents.map((component, index) => {
                        return this._getPageComponent(component, index)
                    })
				}
				{
					this._getPageComponent('Header1')
				}
			</div>
		)
	}
}

export default PageContainer