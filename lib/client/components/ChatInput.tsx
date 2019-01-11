import * as React from 'react';

interface Props {
  handleInput: Function;
  handleSubmit: Function;
  message: string;
}
export function ChatInput(props: Props) {
  return (
    <span>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          props.handleSubmit(e);
        }}
      >
        <input
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.handleInput(e);
          }}
          value={props.message}
        />
        <input type="submit" />
      </form>
    </span>
  );
}
