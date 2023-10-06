import PageHeader from "../components/PageHeader";
import React from "react";
import { FullWidthLayout } from "../components/Layout";
import AppLink from "../components/AppLink";

type PostEditorLayoutProps = {
  children: React.ReactNode;
};
export default function BlogAddLayout({ children }: PostEditorLayoutProps) {
  return (
    <>
      <PageHeader
        actionButton={
          <AppLink variant={"button"} href={"/blog"}>
            Cancel
          </AppLink>
        }
      >
        Add Post
      </PageHeader>
      <FullWidthLayout>{children}</FullWidthLayout>
    </>
  );
}
