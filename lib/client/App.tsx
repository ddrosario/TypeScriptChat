import * as React from 'react';
import { SocketApi } from './socketApi';

interface AppProps {
  framework: String;
  compiler: String;
}
interface messageTuple {
  user: String;
  message: String;
}
interface StateProperties {
  messages: Array<messageTuple>;
}

export default class App extends React.Component<AppProps, {}> {
  private state: StateProperties;
  private socketApi: SocketApi;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      messages: []
    };
    this.socketApi = new SocketApi();
  }
  render() {
    return (
      <span>
        <div>hello from react</div>
        <div />
      </span>
    );
  }
}
