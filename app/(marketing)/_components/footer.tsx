import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <nav className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            보안 정책
          </Button>
          <Button size="sm" variant="ghost">
            서비스 모델
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Footer