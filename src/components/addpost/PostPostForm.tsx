/** @jsx jsx */

import React, {useState, useContext} from "react";
import {jsx, SxStyleProp} from "theme-ui";

import {BoardContext, IBoardContext} from "../../utils/context";

export interface PostPostProps {}

/**
 * A component containing the add post form in order to add a new
 * post to a board.
 *
 * The form embedded in this component will send all requests to
 * `api/board/posts/create` in order to create a post.
 */
export const PostPostForm: React.FC<PostPostProps> = () => {
  const board = useContext<IBoardContext>(BoardContext);

  const [author, setAuthor] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [photo, setPhoto] = useState<File>(null);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    if (message == "" && photo == null) {
      alert("Either a message or photo must be present!");
      event.preventDefault();

      return;
    }

    // temp
    alert("submitted!");
    event.preventDefault();
  };

  return (
    <div>
      <form action='/api/board/posts/create' method='post'>
        <fieldset>
          <label htmlFor='author'>Author:</label>
          <input
            type='text'
            name='name'
            id='author'
            onChange={(e) => setAuthor(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor='message'>Message:</label>
          <input
            type='text'
            name='message'
            id='message'
            onChange={(e) => setMessage(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor='photo'>Photo:</label>
          <input
            type='file'
            accept='image/*'
            name='author'
            id='author'
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </fieldset>

        <button type='submit' onClick={handleSubmit}>
          Submit!
        </button>
      </form>
    </div>
  );
};
