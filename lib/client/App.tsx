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
      messages: [],
      message: '',
      user: '',
      loggedIn: false,
      numberOfUsers: '0'
    };
    this.socketApi = new SocketApi();
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }
  componentDidMount(): void {}
  private handleSendMessage(e: React.FormEvent<HTMLButtonElement>): void {
    this.socketApi.sendMessage('says hi', () => {
      console.log('success!');
    });
    e.preventDefault();
  }
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
  private listenForMessages(): void {
    this.socketApi.getMessages(this.updateMessages);
    this.socketApi.getUserJoined((user: string, numberOfUsers: string) => {});
  }
  private updateMessages(chatJSON: string): void {
    let chatMessage: Array<message> = JSON.parse(chatJSON);
    this.setState({
      messages: chatMessage.concat(this.state.messages)
    });
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    const context: App = this;
    if (e.currentTarget.className === 'UserInput') {
      this.socketApi.join(this.state.user, (chatJSON: string) => {
        this.setState({ loggedIn: true });
        this.updateMessages(chatJSON);
        this.listenForMessages();
      });
    } else {
      this.socketApi.sendMessage(this.state.message, () => {
        context.setState({
          message: ''
        });
      });
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
          <div>There are currently {}</div>
          <MessagesViewer messages={this.state.messages} />
        </span>
      </span>
    );
  }
}
