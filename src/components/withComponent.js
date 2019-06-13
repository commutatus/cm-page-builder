import React from 'react'
import { PermissionContext } from '../contexts/permission-context';

const getVideoUrl = (url) => {
	let videoid = url.replace(/(https{0,1}:\/\/){0,1}(www\.){0,1}((youtube.com\/{0,1}(watch\?v=){0,1})|(vimeo.com\/{0,1}))/g, "")
	if (url.includes('vimeo')) {
		return `//player.vimeo.com/video/${videoid}`
	}
	else if (url.includes('youtube')) {
		return `https://www.youtube.com/embed/${videoid}`
	}
	return ''
}
const withComponent = (WrappedComponent) => {
	class withComponent extends React.Component {

		state = {
			html: this.props.content,
			file: '',
			name: '',
			videoUrl: this.props.content || '',
			emoji: this.props.emoji,
			image: this.props.component_attachment ? {...this.props.component_attachment} : null
		}

		_handleChanges = (e) => {
			this.setState({
				html: e.target.value,
			}, () => {
				if (e.target.value){
					let {html} = this.state
					let {currentType, position, id} = this.props
					if(currentType === 'Title'){
						this.props.handleUpdate(html, null, 'title')
					}else{
						this.props.handleUpdate({ content: html, component_type: currentType, position }, id && !id.includes('AddComponent') ? id : null)
					}
				}
			})
		}

		_uploadImage = (e) => {
			var picBase64 = ''
			if (e.target.files && e.target.files[0]) {
				let fileName = e.target.files[0].name;
				let reader = new FileReader();
				reader.onload = (e) => {
					picBase64 = e.target.result;
					this.setState({
						image: {url: picBase64, name: fileName}
					}, () => {
						if ( picBase64 && fileName )
							this.props.handleUpdate({ component_attachment: { filename: fileName, content: picBase64 }, component_type: this.props.currentType, position: this.props.position }, !this.props.id.includes('AddComponent') ? this.props.id : null)
					})
				}
				reader.readAsDataURL(e.target.files[0]);
			}
		}

		_handleEmbed = (e) => {
			this.setState({
				videoUrl: getVideoUrl(e.target.value),
			}, () => {
				let {videoUrl} = this.state
				let {currentType, position, id} = this.props
				if(videoUrl){
					this.props.handleUpdate({ content: videoUrl, component_type: currentType, position }, id && !id.includes('AddComponent') ? id : null)
				}
			})
		}
		
		optionHandleClick = (e, handleAction) => {
			e.stopPropagation()
			e.preventDefault()
			handleAction('remove-component', this.props.id)
			this.setState({showMoreOptions: true})
		}

		onInputChange = (html) =>{
			this.setState({ html })
		} 

			
		render () {
			const { html, file, videoUrl, showMoreOptions, image } = this.state
			const { id, ...rest } = this.props
			return (
				<WrappedComponent
					{ ...rest }
					html={html}
					handleChange={this._handleChanges}
					uploadImage={this._uploadImage}
					id={id}
					file={file}
					image={image}
					videoUrl={videoUrl}
					handleEmbed={this._handleEmbed}
					emoji={this.state.emoji}
					showMoreOptions={showMoreOptions}
					optionHandleClick={this.optionHandleClick}
					onInputChange={this.onInputChange}
				/>
			)
		}
	}
	return withComponent
}

export default withComponent