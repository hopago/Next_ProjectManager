import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function layout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <main className="h-full bg-slate-100">
      <Navbar />
      <div className="pt-40 pb-20 bg-slate-100">{children}</div>
      <Footer />
    </main>
  );
}
