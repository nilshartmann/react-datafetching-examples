import { getBlogTeaserList } from "@/app/shared/api/backend-queries";
import { Main, Sidebar, TwoColumnLayout } from "@/app/shared/components/Layout";
import PageHeader from "@/app/shared/components/PageHeader";
import AppLink from "@/app/shared/components/AppLink";
import Button from "@/app/shared/components/Button";
import PostTeaser from "@/app/shared/blog/PostTeaser";
import OrderByButton from "@/app/shared/blog/OrderByButton";
import { OrderBy } from "@/app/shared/api/types";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator";
import BlogListPage from "@/app/shared/blog/BlogListPage";

type SearchParams = {
  order_by?: OrderBy;
};

type BlogListRouteProps = {
  searchParams: SearchParams;
};

// Hier mit kann die ganze Route "dynamisch" gemacht werden,
//  d.h. das Caching wird augeschaltet.
//  (auch das Caching jeglicher fetch-Requests, die beim Rendern
//   durchgeführt werden).
//
//  ACHTUNG! Nachdem einschalten von 'force-dynamic' kann es sein
//    dass noch gecachte Informationen (auc im Browser!) vorliegen.
//    Deswegen mit dev:clean starten und im Browser auch Cache leeren!
// Und selbst dann: mal funktioniert es, mal wird trotzdem gecached
// Möglicherweise ist der "Router Cache" (https://nextjs.org/docs/app/building-your-application/caching#router-cache)
//  schuld an dem Verhalten
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default async function BlogListRoute({
  searchParams,
}: BlogListRouteProps) {
  return <BlogListPage orderBy={searchParams.order_by || "desc"} />;
}
