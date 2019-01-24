// class DialogCustom extends React.Component {
//     static show = params => {
//         let container = document.createElement("div");
//         document.body.appendChild(container);
//
//         function closeHandle() {
//             ReactDOM.unmountComponentAtNode(container);
//             document.body.removeChild(container);
//             container = null;
//         }
//
//         ReactDOM.render(<DialogCustom {...params} onClose={closeHandle}/>, container);
//     };
//
//
//
//
//     render() {
//         return (<Modal visible={true}>...</Modal>);
//     }
// }
//
