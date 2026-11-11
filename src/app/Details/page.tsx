import type { Metadata } from "next";

import AllStudio from "@/components/studios/all-studios";
import { getStudios } from "@/lib/studios";

export const metadata: Metadata = {
  title: "Explore studios",
  description:
    "Browse distinctive creative spaces with transparent pricing. Find the room that helps your next project happen.",
};

export default async function DetailsPage() {
  const studios = await getStudios();

  return <AllStudio studios={studios} />;
}
