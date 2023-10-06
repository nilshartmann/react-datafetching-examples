import PageHeader from "@/app/shared/components/PageHeader";
import React from "react";
import { FullWidthLayout, Main } from "@/app/shared/components/Layout";
import AppLink from "@/app/shared/components/AppLink";

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
