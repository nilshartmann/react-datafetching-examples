"use client";
import { useMutationState } from "@/app/shared/components/use-mutation-state";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { addPost } from "@/app/shared/api/server-actions";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/shared/components/PageHeader";
import Message from "@/app/shared/components/Message";
import Post from "@/app/shared/blog/Post";
import Card from "@/app/shared/components/Card";
import Button from "@/app/shared/components/Button";
import ButtonBar from "@/app/shared/components/ButtonBar";
import { H2 } from "@/app/shared/components/Heading";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator";
import { isApiError } from "@/app/shared/api/api-error";

export default function PostEditor() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const mutationState = useMutationState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = (!title && !body) || mutationState.state.isLoading;
  const saveButtonDisabled = !title || !body || mutationState.state.isLoading;

  const mutationErrorMessage = mutationState.state.isError
    ? `Saving failed: ${
        isApiError(mutationState.state.err)
          ? mutationState.state.err.error
          : "Unknown reason"
      }`
    : null;

  function clear() {
    mutationState.reset();
    setTitle("");
    setBody("");
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    mutationState.reset();
  }

  function handleBodyChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    mutationState.reset();
  }

  function openPostList() {
    router.push("/blog");
  }

  async function handleSave() {
    startTransition(async () => {
      const result = await mutationState.run(() => addPost(title, body));
      if (result.status === "success") {
        openPostList();
      }
    });
  }

  return (
    <>
      <div className={"space-y-4"}>
        <Card>
          <div className={"Container"}>
            <fieldset disabled={mutationState.state.isLoading}>
              <label className={"block"}>
                Title
                <input
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={title}
                  onChange={handleTitleChange}
                />
              </label>
              {title ? (
                title.length < 5 ? (
                  <Message
                    msg={`Please enter at lease ${
                      5 - title.length
                    } more characters`}
                  />
                ) : (
                  <Message type="info" msg="Title correctly filled" />
                )
              ) : (
                <Message type="error" msg="Please enter a title" />
              )}

              <label className={"block"}>
                Body
                <textarea
                  className={"w-full rounded bg-grey-2 p-2 "}
                  value={body}
                  onChange={handleBodyChange}
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
