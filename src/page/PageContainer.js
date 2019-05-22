import React from 'react'
import '../styles/page.css'
const PLACEHOLDER_DEFAULT = 'Type something here'
class PageContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    _renderRows = () => {
        var i = 0
        var rows = []
        while (i < 25) {
            i++
            rows.push(<div data-id={`row-${i}`} key={`$row-{i}`} id={`row-${i}`} contentEditable="true" data-text="Enter" className="page-row" ></div>)
        }
        return rows
    }

    _insertPlaceholder = (e) => {
        document.getElementById(`${e.target.dataset.id}`).placeholder = PLACEHOLDER_DEFAULT
    }

    render() {
        return (
            <div className="page-root-container  ">
                <div contentEditable="true" className="page-editable-container">
                {
                    this._renderRows()
                }
                </div>
            </div>
        )
    }
}

export default PageContainer    