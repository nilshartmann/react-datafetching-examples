"use client";
import { useState } from "react";
import { addPost } from "@/app/shared/api/server-actions";
import Message from "@/app/shared/components/Message";
import Post from "@/app/shared/blog/Post";
import Card from "@/app/shared/components/Card";
import Button from "@/app/shared/components/Button";
import ButtonBar from "@/app/shared/components/ButtonBar";
import { H2 } from "@/app/shared/components/Heading";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator";
import {
  ActionFunction,
  redirect,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export const addPostAction: ActionFunction = async ({ params, request }) => {
  const { title, body } = (await request.json()) as {
    title: string;
    body: string;
  };

  const result = await addPost(title, body);
  if (result.status === "success") {
    return redirect("/blog");
  }

  return result;
};

export default function PostEditor() {
  const navigate = useNavigate();
  const isPending = useNavigation().state === "submitting";
  const submit = useSubmit();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const clearDisabled = (!title && !body) || isPending;
  const saveButtonDisabled = !title || !body || isPending;

  function clear() {
    setTitle("");
    setBody("");
  }

  function openPostList() {
    navigate("/blog");
  }

  async function handleSave() {
    submit({ title, body }, { method: "post", encType: "application/json" });
  }

  return (
    <>
      <div className={"space-y-4"}>
        <Card>
          <div className={"Container"}>
            <fieldset disabled={isPending}>
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
