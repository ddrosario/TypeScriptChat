import * as React from 'react';
import { SocketApi } from './socketApi';
import { MessagesViewer } from './components/MessagesViewer';
import { ChatInput } from './components/ChatInput';
import { UserInput } from './components/UserInput';

export interface Props {
  // framework: String;
  // compiler: String;
}
export declare interface message {
  user: string;
  message: string;
}
export declare interface messagesViewerProps {
  messages: Array<message>;
}
declare interface StateProperties {
  messages: Array<message>;
  message: string;
  user: string;
  loggedIn: boolean;
  numberOfUsers: string;
}
declare interface stateUpdate {
  user?: string;
  message?: string;
}
export class App extends React.Component<Props, {}> {
  readonly state: StateProperties;
  private socketApi: SocketApi;

  constructor(props: Props) {
    super(props);
    this.state = {
      user: '',
      message: '',
      messages: [],
      loggedIn: false,
      numberOfUsers: '0'
    };
    this.socketApi = new SocketApi();
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }
  componentDidMount(): void {}
  /* SocketAPI functionality */
  private listenForMessages(): void {
    this.socketApi.getMessages(this.updateMessages);
    this.socketApi.getUserJoined((user: string, numberOfUsers: string) => {
      this.setState({
        numberOfUsers: numberOfUsers
      });
    });
  }
  private updateMessages(chatJSON: string, numberOfUsers: string): void {
    let chatMessage: Array<message> = JSON.parse(chatJSON);
    this.setState({
      messages: chatMessage.concat(this.state.messages),
      numberOfUsers: numberOfUsers || this.state.numberOfUsers
    });
  }
  private joinChat(): void {
    this.socketApi.join(
      this.state.user,
      (chatJSON: string, numberOfUsers: string) => {
        this.setState({ loggedIn: true });
        this.updateMessages(chatJSON, numberOfUsers);
        this.listenForMessages();
      }
    );
  }
  private sendMessage(): void {
    this.socketApi.sendMessage(this.state.message, () => {
      this.setState({
        message: ''
      });
    });
  }
  /* React events */
  private handleInput(e: React.FormEvent<HTMLInputElement>): void {
    const stateUpdate: stateUpdate = {};
    if (e.currentTarget.id === 'user') {
      stateUpdate.user = e.currentTarget.value;
    }
    if (e.currentTarget.id === 'message') {
      stateUpdate.message = e.currentTarget.value;
    }
    this.setState(stateUpdate);
  }
  private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    if (e.currentTarget.className === 'UserInput') {
      this.joinChat();
    } else {
      this.sendMessage();
    }
    e.preventDefault();
  }

  render() {
    return (
      <span>
        {!this.state.loggedIn ? (
          <UserInput
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
            user={this.state.user}
          />
        ) : (
          <ChatInput
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
            message={this.state.message}
          />
        )}

        <span>
          <div>There are currently {this.state.numberOfUsers} users</div>
          <MessagesViewer messages={this.state.messages} />
        </span>
      </span>
    );
  }
}
