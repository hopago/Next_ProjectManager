import create from "@/actions/board/create-board";

export default function page() {
  return (
    <div>
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="제목을 입력하세요."
          className="border-black border p-1 focus:outline-none"
        />
      </form>
    </div>
  );
}
