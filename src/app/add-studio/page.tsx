import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AddStudioFrom from "@/components/layout/Add-Studio-from";
import MyStudioListings from "@/components/layout/MyStudioListings";
import { auth } from "@/lib/auth";
import { getStudiosByHost } from "@/lib/studios";

type AddStudioPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AddStudioPage({
  searchParams,
}: AddStudioPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const requestedNewStudio = params?.new === "1";
  const studios = await getStudiosByHost(user.email);

  const showForm = requestedNewStudio || studios.length === 0;

  if (showForm) {
    return <AddStudioFrom user={user} />;
  }

  return <MyStudioListings studios={studios} />;
}
