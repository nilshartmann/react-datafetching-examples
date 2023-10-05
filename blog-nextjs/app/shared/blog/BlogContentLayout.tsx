import PageHeader from "@/app/shared/components/PageHeader";
import AppLink from "@/app/shared/components/AppLink";
import { Main, Sidebar, TwoColumnLayout } from "@/app/shared/components/Layout";
import BlogContentLayoutSidebar from "@/app/shared/blog/BlogContentLayoutSidebar";

type BlogContentLayoutProps = {
  children: React.ReactNode;
};
export default function BlogContentLayout({
  children,
}: BlogContentLayoutProps) {
  return (
    <>
      <PageHeader
        actionButton={
          <AppLink variant={"button"} href={"/blog/add"}>
            Create new Post
          </AppLink>
        }
      >
        <AppLink href={"/blog"}>Home</AppLink>
      </PageHeader>
      <TwoColumnLayout>
        <Main>{children}</Main>
        <Sidebar>
          <BlogContentLayoutSidebar />
        </Sidebar>
      </TwoColumnLayout>
    </>
  );
}
