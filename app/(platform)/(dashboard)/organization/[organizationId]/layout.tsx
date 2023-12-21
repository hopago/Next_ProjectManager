import OrganizationControl from "./_components/org-control";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
}
