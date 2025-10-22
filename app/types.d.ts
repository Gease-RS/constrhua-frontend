import { ProjectPageParams } from "./[id]/page";

declare module "next" {
  interface PageProps {
    params: ProjectPageParams;
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}