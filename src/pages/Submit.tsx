import React, { useState, FormEvent, ChangeEvent, useCallback } from "react";
import { createUserPost } from '../utils/storage/createdPostsAPI';
import { Link } from 'react-router-dom';
import { PostsTabs } from '../components/configs/postsTabs';
import { SubmitResponse, usePostUserPost } from '../http/hooks/usePostUserPost';


const Input = React.memo((
  props: {
    value: string;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
  }
) => (
  <input
    value={props.value}
    onChange={props.onChange}
    type="text"
    placeholder="Title"
    required
  />
))

const TextArea = React.memo((
  props: {
    value: string;
    onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  }
) => (
  <textarea
    placeholder="Post content"
    value={props.value}
    onChange={props.onChange}
    required
  />
))

const Button = React.memo((
  props: { isLoading: boolean }
) => (
  <button type="submit" disabled={props.isLoading}>
    {props.isLoading ? "Sending..." : "Send"}
  </button>
))

export const userId = 11;

interface FormData {
  title: string;
  body: string;
}

const Submit = () => {
  const [form, setForm] = useState<FormData>({ title: "", body: "" });
  const [response, setResponse] = useState<SubmitResponse | null>(null);

  const saveResponse = (data: FormData, id: number) => {
    createUserPost({
      userPost: {
        title: data.title,
        body: data.body,
        id,
        userId,
      }
    })
  }

  const { isLoading, error, clearError, request } = usePostUserPost()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);
    clearError();

    request(form)
      .then(({ data }) => {
        if (!data) return;
        const id = Date.now();
        saveResponse(form, id);
        setResponse({ ...data, id });
        setForm({ title: "", body: "" });
      })
  };

  const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, title: e.target.value }));
  }, []);

  const handleBodyChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, body: e.target.value }));
  }, []);

  return (
    <section className="container">
      <h2>Submit your post</h2>

      <form onSubmit={handleSubmit}>
        <Input
          value={form.title}
          onChange={handleTitleChange}
        />

        <TextArea
          value={form.body}
          onChange={handleBodyChange}
        />

        <Button
          isLoading={isLoading}
        />
      </form>

      {response && (
        <p
          style={{
            color: "green",
            marginTop: "1rem",
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}
        >
          <span>Post submitted!</span>
          <Link
            to={`/posts?tab=${PostsTabs.MY}`}
          >
            ID: {response.id}
          </Link>
        </p>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </section>
  );
};

export default Submit;

