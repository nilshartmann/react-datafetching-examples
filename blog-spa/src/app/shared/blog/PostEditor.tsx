"use client";
import { useMutationState } from "@/app/shared/components/use-mutation-state";
import { useRef, useState } from "react";
import { addPost } from "@/app/shared/api/server-actions";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/shared/components/PageHeader";
import Message from "@/app/shared/components/Message";
import Post from "@/app/shared/blog/Post";
import Card from "@/app/shared/components/Card";
import Button from "@/app/shared/components/Button";
import ButtonBar from "@/app/shared/components/ButtonBar";

export default function PostEditor() {
  const router = useRouter();
  const mutationState = useMutationState();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = (!title && !body) || mutationState.state.isLoading;
  const saveButtonDisabled = !title || !body || mutationState.state.isLoading;

  function clear() {
    setTitle("");
    setBody("");
  }

  function openPostList() {
    router.push("/blog");
  }

  async function handleSave() {
    const result = await mutationState.run(() => addPost(title, body));
    if (result.status === "success") {
      openPostList();
    }
  }

  return (
    <>
      <PageHeader>Add Post</PageHeader>
      <div className={"space-y-4"}>
        <Card>
          <div className={"Container"}>
            <label className={"block"}>
              Title
              <input
                className={"bg-grey-2 w-full rounded p-2 "}
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
                className={"bg-grey-2 w-full rounded p-2 "}
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
              />
            </label>
            {body ? (
              <Message type="info" msg="Body correctly filled" />
            ) : (
              <Message msg="Please enter a body" />
            )}

            <ButtonBar>
              <Button disabled={clearDisabled} onClick={clear}>
                Clear
              </Button>
              <Button onClick={openPostList}>Cancel</Button>
              <Button disabled={saveButtonDisabled} onClick={handleSave}>
                Save Post
              </Button>
            </ButtonBar>
          </div>
        </Card>
        <Card>
          <h2>Preview: Your new Post</h2>
        </Card>
        <Post post={{ title, bodyHtml: body }} />
      </div>
    </>
  );
}
