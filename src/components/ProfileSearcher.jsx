export default function ProfileSearcher() {
  return (
    <>
      <form className="w-full max-w-[500px] mx-auto flex items-center justify-between outline-none border-2 rounded-full">
        <label htmlFor="profileName" className="px-4"><i className="text-2xl ri-search-line"></i></label>
        <input
          className="w-full bg-transparent outline-none px-4 py-2"
          type="text"
          name="profileName"
          placeholder="Search profiles"
        />
      </form>
      <ul className="min-h-16 w-full flex items-center justify-start mt-4"></ul>
    </>
  );
}
