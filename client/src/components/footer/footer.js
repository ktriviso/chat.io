import React, {Component} from 'react'


export default class Footer extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    render(){
        const icon_style = {
            color: '#fff',
            fill: '#fff'

        }
        const list_style = {
            listStyleType: 'none',
            color: '#fff'
        }
        const footer_style = {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '100%'
        }
        const ul_style = {
            margin: '0px',
            listStyleType: 'none',
            color: '#fff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'flex end'
        }
        return (
            <div id="Footer" style={footer_style}>
                <ul style={ul_style}>
                    <li>
                        <a href="" style={icon_style}>
                        
                        </a>
                        <a href="" style={icon_style}>
                       
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}