import { auth } from "@clerk/nextjs";
import OrganizationControl from "./_components/org-control";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization")
  }
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
}
