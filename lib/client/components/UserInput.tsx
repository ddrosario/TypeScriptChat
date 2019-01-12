import * as React from 'react';

interface Props {
  handleInput: Function;
  handleSubmit: Function;
  user: string;
}
export function UserInput(props: Props) {
  return (
    <span>
      <form
        className="UserInput"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          props.handleSubmit(e);
        }}
      >
        <input
          id="user"
          type="text"
          placeholder="Please enter a username"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.handleInput(e);
          }}
          value={props.user}
        />
        <input type="submit" />
      </form>
    </span>
  );
}
