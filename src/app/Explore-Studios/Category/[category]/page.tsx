import type { Metadata } from "next";

import {
  ALL_CATEGORIES_LABEL,
  STUDIO_CATEGORIES,
} from "@/lib/studio-constants";
import { getStudios } from "@/lib/studios";
import AllStudio from "@/components/studios/all-studios";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

function getKnownCategory(value: string) {
  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  return (
    STUDIO_CATEGORIES.find(
      (category) => category.toLowerCase() === decoded.toLowerCase(),
    ) ?? ALL_CATEGORIES_LABEL
  );
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = getKnownCategory(category);

  if (categoryName === ALL_CATEGORIES_LABEL) {
    return {
      title: "Explore studios",
      description:
        "Browse distinctive creative spaces with transparent pricing at The Rising Star.",
    };
  }

  return {
    title: `${categoryName} studios`,
    description: `Browse ${categoryName.toLowerCase()} spaces at The Rising Star.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = getKnownCategory(category);
  const studios = await getStudios();

  return (
    <AllStudio
      key={categoryName}
      studios={studios}
      initialCategory={categoryName}
    />
  );
}
