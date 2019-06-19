import React from 'react'

const withComponent = (WrappedComponent) => {
	class withComponent extends React.Component {
			
		render () {
			return (
				<WrappedComponent
					{ ...this.props.data }
				/>
			)
		}
	}
	return withComponent
}

export default withComponent
