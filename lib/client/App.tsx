import * as React from 'react';
import { SocketApi } from './socketApi';
import { MessagesViewer } from './components/MessagesViewer';
import { ChatInput } from './components/ChatInput';

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
}

export class App extends React.Component<Props, {}> {
  readonly state: StateProperties;
  private socketApi: SocketApi;

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      user: ''
    };
    this.socketApi = new SocketApi();
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }
  componentDidMount(): void {
    this.socketApi.join('Drew', (chatJSON: string) => {
      let chatMessage: Object = JSON.parse(chatJSON);
      this.setState({
        messages: [chatMessage].concat(this.state.messages)
      });
    });
  }
  private handleSendMessage(e: React.FormEvent<HTMLButtonElement>): void {
    this.socketApi.sendMessage('says hi', () => {
      console.log('success!');
    });
    e.preventDefault();
  }
  private handleInput(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      message: e.currentTarget.value
    });
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    const context: App = this;
    this.socketApi.sendMessage(this.state.message, () => {
      context.setState({
        message: ''
      });
      console.log('success!');
    });
    e.preventDefault();
  }
  render() {
    return (
      <span>
        <ChatInput
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          message={this.state.message}
        />
        <span>
          <MessagesViewer messages={this.state.messages} />
        </span>
      </span>
    );
  }
}
