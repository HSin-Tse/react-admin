import {Button} from "antd";
import React from "react";

export const { Provider, Consumer } = React.createContext('primary');

export const ThemedButton = (props) => {
    return <div>

        {/*<Button type={props.theme}>{props.children}</Button>*/}

        <Consumer>
            {theme =>
                <Button {...props} type={theme}>
                </Button>
            }
        </Consumer>
    </div>;
};


