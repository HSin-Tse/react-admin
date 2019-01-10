import React, {Component} from 'react'
import avater from "@/style/imgs/ixlogo.png";
import Image from 'react-shimmer'
class Notice extends Component {



    componentDidMount(){
        
        console.log('hcia componentDidMount' )
        
        console.log('hcia this.props' , this.props,`toast-notice ${this.props.type}`)
        
    }
    render() {
        const icons = {
            info: 'icon-info-circle-fill',
            success: 'icon-check-circle-fill',
            warning: 'icon-warning-circle-fill',
            error: 'icon-close-circle-fill',
            loading: 'icon-loading'
        }
        const {type, content} = this.props
        return (



            <div  style={{}} className={`circle bounce animated infinite toast-notice ${type}`}>
                {/*<svg className="icon" aria-hidden="true">*/}
                    {/*<use xlinkHref={`#${icons[type]}`}/>*/}
                {/*</svg>*/}
                {/*<img style={{height: 150, width: 150}} src={avater} alt="头像"/>*/}

                <Image


                src={avater}
                 width={153} height={148}
                style={{background: '#00ff00'}} // Style your <img>
                // delay={25}
                duration={0} // Customize the animation duration (s).
                />
                {/*<div>IX</div>*/}
                {/*<span>{content}</span>*/}
            </div>
        )
    }
}

export default Notice