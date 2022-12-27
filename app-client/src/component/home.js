import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './home.scss';
import Game from './game';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      isUserNameSet: false,
      showForm: false,
      players: [],
      isSinglePlayer: undefined,
      isGameOn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange(event) {
    let userName = event.target.value
    this.setState({
      userName: userName
    })
  }

  handleSubmit(event) {
    // music.playSound("s1");
    let userName = this.state.userName;
    let regex = new RegExp(/^(?=.{3,11}$)(?![0-9])(?!.*[_]{2})[A-Za-z0-9_]+$/)
    console.log('Is it a valid username? ', regex.test(userName))
    if(regex.test(userName) && userName !=="Computer") {
      this.setState({
        userName: userName,
        isUserNameSet: true,
        showForm: false
      })
    } else {
      this.setState({
        isUserNameSet: false,
      })
      alert("Invalid username")
    }
    console.log('userName:', userName)
    event.preventDefault();
  }

  initialGame(isSinglePlayer) {
    // music.playSound("s1");
    if (!isSinglePlayer) {
      alert(`Multi Player mode isn't available yet 🙂`)
    }
    else if (this.state.isUserNameSet){
      this.startGame2(this.state.userName, isSinglePlayer);
    } else {
      alert('Please set username first!')
    }
  }

  renderForm() {
    // music.playSound("s1");
    this.setState({
      showForm: !this.state.showForm
    });
  }

  startGame2(Username, isSinglePlayer) {
    const userName = isSinglePlayer? 'Computer' : "XYZ";
    this.setState({
      players: [
        {name: Username, gamesWon: 0},
        {name: userName, gamesWon: 0}
      ],
      isSinglePlayer: isSinglePlayer,
      isGameOn: true
    })
  }
  
  render() {
    const handleClose = () => {
      this.setState({
        showForm: false
      })
    }
    return (
      <div id='main'>
        { !this.state.isGameOn && 
        <>
        <h1>Tic-Tac-Toe</h1>
        <div className='row'>
          <div className='col-md-4 d1'></div>
          <div className='col-md-4 d2'>
            <div className="homepage mr-t-10">
              <button className='start-button neumorphism-button' 
                onClick={this.renderForm}
              >Set Username</button>
              <button className='start-button' 
                onClick={()=>this.initialGame(true)}
              >Start Game</button>
              <button className='start-button'
                onClick={()=>this.initialGame(false)}
              >Multi Player</button>
              <Modal 
                show={this.state.showForm} 
                onHide={handleClose} 
                size="sm"
                dialogClassName="custom-modal"
              >
                <Modal.Body>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId={this.state.value} >
                      <Form.Label className="custom-label">Enter your user name</Form.Label>
                      <Form.Control className="custom-input" type="text" onChange={this.handleChange} autoFocus/>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                      Submit
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className='col-md-4 d3'></div>
        </div>
        </> }
        { this.state.isGameOn && <Game players = {this.state.players} isSinglePlayer = {this.state.isSinglePlayer}/> }
      </div>
    )
  }
}

export default Home;