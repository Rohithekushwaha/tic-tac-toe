import React from 'react';
import { Button, Form, Modal} from 'react-bootstrap';
import './home.scss'
import Game from './game'

class Home extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        userName: "",
        isUserNameSet: false,
        showForm: false,
        players: [],
        isMultiPlayer: undefined,
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
      let regex = new RegExp(/^[A-Za-z]+[0-9]*$/)
      console.log(regex.test(userName))
      if(regex.test(userName)) {
        this.setState({
          userName: userName,
          isUserNameSet: true,
          showForm: false
        })
      } else {
        alert("Invalid username")
      }
      console.log('userName:', userName)
      event.preventDefault();
    }
  
    initialGame(isMultiPlayer) {
      // music.playSound("s1");
      if (this.state.isUserNameSet){
        this.startGame2(this.state.userName, isMultiPlayer);
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

    startGame2(Username, isMultiPlayer) {
      const userName = isMultiPlayer? 'Computer' : "XYZ";
      console.log("Players: ", this.state.players)
      this.setState({
        players: [
          {name: Username, gamesWon: 0},
          {name: userName, gamesWon: 0}
        ],
        isMultiPlayer: isMultiPlayer,
        isGameOn: true
      })
      console.log("Players: ", this.state.players)
    }
    
    render() {
      const handleClose = () => {
        this.setState({
          showForm: false
        })
      }
      return (
        <>
          { !this.state.isGameOn && 
          <>
          <h1 className='margin-top-6'>Tic-Tac-Toe</h1>
          <div className='row margin-top-6'>
            <div className='col-md-4 d1'></div>
            <div className='col-md-4 d2'>
              <div className="homepage mr-t-10">
                <button className='start-button' 
                  onClick={this.renderForm}
                >Set Username</button>
                <button className='start-button'  
                  onClick={()=>this.initialGame(false)}
                >Single Player</button>
                <button className='start-button' 
                  onClick={()=>this.initialGame(true)}
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
                        <Form.Label>Enter your user name</Form.Label>
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
          { this.state.isGameOn && <Game players = {this.state.players} isMultiPlayer = {this.state.isMultiPlayer}/> }
        </>
      )
    }
  }

  export default Home;