import { Modal } from 'react-bootstrap';
import ReactLoading from "react-loading";

export function LoadingModal(props) {
  let socket = props.socket !== undefined;
  if (socket) getSecondPlayer();
  async function getSecondPlayer() {
    props.socket.emit('find');
    await props.socket.on('found', opponent => {
      props.fn(opponent.username, true);
    });
  }
  return (
    <Modal show={socket}>
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
    </Modal>
  )
}