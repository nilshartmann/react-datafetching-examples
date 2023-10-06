import { ChangeEvent, useState } from "react";
import { addPost } from "../api/server-actions";
import Message from "../components/Message";
import Post from "./Post";
import Card from "../components/Card";
import Button from "../components/Button";
import ButtonBar from "../components/ButtonBar";
import { H2 } from "../components/Heading";
import LoadingIndicator from "../components/LoadingIndicator";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { isApiError } from "../api/api-error.ts";

export default function PostEditor() {
  const navigate = useNavigate();
  const addPostMutation = useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) =>
      addPost(title, body),
  });

  const isPending = addPostMutation.isPending;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = (!title && !body) || isPending;
  const saveButtonDisabled = !title || !body || isPending;

  const mutationErrorMessage = addPostMutation.isError
    ? `Saving failed: ${
        "err" in addPostMutation.error && isApiError(addPostMutation.error.err)
          ? addPostMutation.error.err.error
          : "Unknown reason"
      }`
    : null;

  function clear() {
    addPostMutation.reset();
    setTitle("");
    setBody("");
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    addPostMutation.reset();
  }

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    addPostMutation.reset();
  }

  function openPostList() {
    navigate("/blog");
  }

  async function handleSave() {
    const result = await addPostMutation.mutateAsync({ title, body });
    if (result.status === "success") {
      openPostList();
    }
  }

  return (
    <>
      <div className={"space-y-4"}>
        <Card>
          <div className={"Container"}>
            <fieldset disabled={addPostMutation.isPending}>
              <label className={"block"}>
                Title
                <input
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={title}
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
              </label>
              {title ? (
                <Message type="info" msg="Title correctly filled" />
              ) : (
                <Message type="error" msg="Please enter a title" />
              )}

              <label className={"block"}>
                Body
                <textarea
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={body}
                  onChange={(e) => setBody(e.currentTarget.value)}
                />
              </label>
              {body ? (
                <Message type="info" msg="Body correctly filled" />
              ) : (
                <Message msg="Please enter a body" />
              )}
            </fieldset>
            <ButtonBar>
              <Button disabled={clearDisabled} onClick={clear}>
                Clear
              </Button>
              <Button onClick={openPostList}>Cancel</Button>
              <Button disabled={saveButtonDisabled} onClick={handleSave}>
                {isPending && <LoadingIndicator secondary />}
                {isPending || "Save Post"}
              </Button>
            </ButtonBar>
            {!!mutationErrorMessage && <Message msg={mutationErrorMessage} />}
          </div>
        </Card>
        <Card>
          <H2 style={"primary"}>Preview: Your new Post</H2>
        </Card>
        {!!(title || body) && <Post post={{ title, bodyHtml: body }} />}
      </div>
    </>
  );
}
