import React, { Component } from 'react'
import Image from 'react-shimmer'
class Notice extends Component {
    render() {
        const icons = {
            info: 'icon-info-circle-fill',
            success: 'icon-check-circle-fill',
            warning: 'icon-warning-circle-fill',
            error: 'icon-close-circle-fill',
            loading: 'icon-loading'
        }
        const { type, content } = this.props
        return (
            <div className={`toast-notice ${type}`}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#${icons[type]}`} />
                </svg>
                <Image
                    src={'https://example.com/test.jpg'}
                    width={1200} height={1200}
                    // style={{objectFit: 'cover'}} // Style your <img>
                    // delay={25}
                    duration={1000} // Customize the animation duration (s).
                />
                {/*<div>IX</div>*/}
                <span>{content}</span>
            </div>
        )
    }
}

export default Notice