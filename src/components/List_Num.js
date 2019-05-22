import React from 'react'
import '../styles/components/List.css'

export class List_Num extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemsCount: 1
        }
    }

    _renderItems = () => {
        let { itemsCount } = this.state
        let itemsList = []
        while(itemsCount>0) {
            itemsCount--
            itemsList.push(
                <li key={`${itemsCount}-item`}>
                    <div contentEditable="true" className="list-editable-row" />
                </li>
            )
        }
        return itemsList
    }

    render() {
        return (
            <ol>
                {
                    this._renderItems()
                }
            </ol>
        )
    }
}
