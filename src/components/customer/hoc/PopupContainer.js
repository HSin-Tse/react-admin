import React, {Component} from 'react';
import CustomerSummary from '@/components/customer/CustomerSummary'
import {handleKeyPress} from '@/components/customer/CustomerSummary'

const PopupContainer = (Wrapper,handleKeyPress) =>
    class WrapperComponent extends Component {

        // handleKeyPress = (event) => {
        //     if (event.metaKey || event.ctrlKey) {
        //         if (event.key === 'o') {
        //             this.setState({
        //                 switcherOn: !this.state.switcherOn
        //             })
        //         }
        //     }
        // }

        componentDidMount() {
            console.log('hcia','componentDidMount')
            console.log('hcia CustomerSummary.handleKeyPress' , handleKeyPress)
            document.addEventListener("keydown", handleKeyPress, false);

        }

        componentWillUnmount() {
            console.log('hcia','componentWillUnmount')
            document.removeEventListener("keydown", handleKeyPress, false);

        }

        render() {
            return <Wrapper {...this.props} />;
        }
    }


export  default PopupContainer