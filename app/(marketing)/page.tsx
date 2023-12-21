import { Button } from "@/components/ui/button";

import { Medal } from "lucide-react";

import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 프로젝트 관리툴
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify는 팀의 방향성을
        </h1>
        <p className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          이끕니다
        </p>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        협업, 프로젝트 관리, 새로운 생산성을 향해. 범용성 넘치는 활용, 유니크한 성취, Taskify.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">
          무료로 시작하기
        </Link>
      </Button>
    </div>
  );
}
