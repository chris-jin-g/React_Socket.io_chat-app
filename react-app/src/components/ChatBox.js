import React, { Component } from "react";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { faGrin, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MessageList,
  Navbar as NavbarComponent,
  Avatar
} from "react-chat-elements";

/**
 *
 * ChatBox Component
 *
 * displays all the messages from chat history.
 * renders message text box for input.
 */

export default class ChatBox extends Component {
  state = {
    messageText: ""
  };
  /**
   *
   * Sends a message only if it is not falsy.
   */
  onSendClicked() {
    if (!this.state.messageText) {
      return;
    }
    this.props.onSendClicked(this.state.messageText);
    this.setState({ messageText: "" });
  }
  onMessageInputChange(e) {
    this.setState({ messageText: e.target.value });
  }
  /**
   *
   * @param {KeyboardEvent} e
   *
   * listen for enter pressed and sends the message.
   */
  onMessageKeyPress(e) {
    if (e.key === "Enter") {
      this.onSendClicked();
    }
  }

  render() {
    return (
      <div>
        {this.props.targetUser ? (
          <div>
            <NavbarComponent
              left={
                <div>
                  <Col mdHidden lgHidden>
                    <p className="navBarText">
                      <Glyphicon
                        onClick={this.props.onBackPressed}
                        glyph="chevron-left"
                      />
                    </p>
                  </Col>
                  <Avatar
                    src={require(`../static/images/avatar/${
                      this.props.targetUser.id
                    }.jpg`)}
                    alt={"logo"}
                    size="large"
                    type="circle flexible"
                  />
                  <p className="navBarText">{this.props.targetUser.name}</p>
                </div>
              }
            />
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.props.targetUser.messages}
            />
            <FormGroup className="send-message-form">
              <Row style={{width:"100%"}}>
                <Col md={1}>
                  <InputGroup className="emoji-icon">
                    <FontAwesomeIcon  icon={faGrin} color="grey" size="lg" />
                  </InputGroup>
                </Col>
                  
                <Col md={10}>
                  <InputGroup style={{width:"100%"}}>
                    <FormControl
                      type="text"
                      value={this.state.messageText}
                      onChange={this.onMessageInputChange.bind(this)}
                      onKeyPress={this.onMessageKeyPress.bind(this)}
                      placeholder="Type a message here (Limit 3000 characters)..."
                      ref="messageTextBox"
                      className="messageTextBox"
                      maxLength="3000"
                      autoFocus
                    />                    
                  </InputGroup>
                </Col>
                <Col md={1} style={{padding:"5px 0px"}}>
                  <InputGroup.Button>
                    <div
                      disabled={!this.state.messageText}
                      className="sendButton"
                      onClick={this.onSendClicked.bind(this)}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} color="white" />
                    </div>
                  </InputGroup.Button>
                </Col>
              </Row>
            </FormGroup>
          </div>
        ) : (
          <div>
            <Jumbotron>
              <h1>Hello, {(this.props.signedInUser || {}).name}!</h1>
              <p>Select a friend to start a chat.</p>
            </Jumbotron>
          </div>
        )}
      </div>
    );
  }
}
