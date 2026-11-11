import type { Metadata } from "next";

import { getStudios } from "@/lib/studios";
import AllStudio from "@/components/studios/all-studios";

export const metadata: Metadata = {
  title: "Explore studios",
  description:
    "Browse distinctive creative spaces with transparent pricing. Find the room that helps your next project happen.",
};

export default async function ExploreStudioPage() {
  const studios = await getStudios();

  return <AllStudio studios={studios} />;
}
