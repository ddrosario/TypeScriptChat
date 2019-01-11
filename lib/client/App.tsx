import * as React from 'react';
import { SocketApi } from './socketApi';

export interface Props {
  // framework: String;
  // compiler: String;
}
declare interface message {
  user: string;
  message: string;
}
declare interface StateProperties {
  messages: Array<message>;
}

export class App extends React.Component<Props, {}> {
  readonly state: StateProperties = {
    messages: [{ user: 'bob', message: 'hello' }]
  };
  private socketApi: SocketApi;

  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     messages: []
  //   };
  //   this.socketApi = new SocketApi();
  // }
  componentDidMount(): void {
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
