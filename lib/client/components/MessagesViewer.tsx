import * as React from 'react';
import { messagesViewerProps, message } from '../App';

export function MessagesViewer(props: messagesViewerProps) {
  return (
    <span>
      <div>
        {props.messages.map((message: message) => {
          return (
            <div>
              {message.user}: {message.message}
            </div>
          );
        })}
      </div>
    </span>
  );
}
