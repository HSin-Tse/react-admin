import React, {Component} from 'react'
import avater from "@/style/imgs/ixlogo.png";
import Image from 'react-shimmer'
import posed from 'react-pose';
const Box = posed.div({

    popped: {
        x: -10,
        y: -10,
        background: 'rgba(161, 0, 246, 1)',
        boxShadow: '10px 10px 20px rgba(161, 0, 246, 0.2)',
        transition: { duration: 0 }
    },

    // visible: { opacity: 1 },
    // hidden: { opacity: 0 }
});
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



            <div  style={{}} className={`bounce circle  animated infinite toast-notice ${type}`}>
                {/*<svg className="icon" aria-hidden="true">*/}
                    {/*<use xlinkHref={`#${icons[type]}`}/>*/}
                {/*</svg>*/}
                {/*<img style={{height: 150, width: 150}} src={avater} alt="头像"/>*/}

                <Image


                src={avater}
                 width={153} height={148}
                style={{background: '#00000000'}} // Style your <img>
                // delay={25}
                duration={0} // Customize the animation duration (s).
                />
                <Box
                    className="box"
                    pose={'visible'}
                />
                {/*<div>IX</div>*/}
                {/*<span>{content}</span>*/}
            </div>
        )
    }
}

export default Notice