import * as React from 'react';
import { messagesViewerProps, message } from '../App';

export function MessagesViewer(props: messagesViewerProps) {
  return (
    <span>
      <div>
        {props.messages.map((message: message, index: number) => {
          return (
            <div key={index}>
              {message.user}: {message.message}
            </div>
          );
        })}
      </div>
    </span>
  );
}
