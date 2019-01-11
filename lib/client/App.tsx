import * as React from 'react';
import { SocketApi } from './socketApi';
import { MessagesViewer } from './components/MessagesViewer';

export interface Props {
  // framework: String;
  // compiler: String;
}
export declare interface message {
  user: String;
  message: String;
}
export declare interface messagesViewerProps {
  messages: Array<message>;
}
declare interface StateProperties {
  messages: Array<message>;
}

export class App extends React.Component<Props, {}> {
  readonly state: StateProperties;
  private socketApi: SocketApi;

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: []
    };
    this.socketApi = new SocketApi();
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }
  componentDidMount(): void {
    this.socketApi.join('Drew', (chatJSON: string) => {
      let chatMessage: any = JSON.parse(chatJSON);
      this.setState({
        messages: this.state.messages.concat([chatMessage])
      });
    });
  }
  handleSendMessage(e: React.FormEvent<HTMLButtonElement>): void {
    this.socketApi.sendMessage('says hi', () => {
      console.log('success!');
    });
    e.preventDefault();
  }
  render() {
    return (
      <span>
        <div>hello from react</div>
        <div />
        <button onClick={this.handleSendMessage} />
        <MessagesViewer messages={this.state.messages} />
      </span>
    );
  }
}
