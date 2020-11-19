import React from "react";
import { Modal } from "antd";

export const InfoModal = (props) => {
  Modal.info({
    title: "Email verification",
    content: (
      <div>
        <p>{props.message}</p>
      </div>
    ),
    onOk() {
      props.history.push(props.redirectTo);
    },
  });
};

// import { Modal } from "antd";

// export default class AlertModal extends React.Component {
//   // state = {
//   //   visible: true,
//   //   message: this.props.message,
//   //   redirectTo: this.props.redirectTo,
//   // };

//   handleOk = (e) => {
//     this.props.history.push(this.props.redirectTo);
//   };

//   // handleCancel = (e) => {
//   // console.log(e);
//   // this.setState({
//   //   visible: false,
//   // });
//   // };

//   render() {
//     return (
//       <div>
//         <Modal
//           title="Email verification"
//           visible={true}
//           onOk={this.handleOk}
//           // onCancel={this.handleCancel}
//         >
//           <p>{this.props.message}</p>
//         </Modal>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);
// <Button type="primary" onClick={this.showModal}>
//   Open Modal
// </Button>
