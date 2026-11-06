import type { Metadata } from "next";

import { getStudios } from "@/lib/studios";
import AllStudio from "@/app/Details/page";

export const metadata: Metadata = {
  title: "Explore studios",
  description:
    "Browse distinctive creative spaces with transparent pricing. Find the room that helps your next project happen.",
};

export default async function ExploreStudioPage() {
  const studios = await getStudios();

  return <AllStudio studios={studios} />;
}
