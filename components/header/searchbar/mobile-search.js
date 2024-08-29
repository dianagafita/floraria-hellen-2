import Search from "./search";

export default function MobileSearch() {
  return (
    <div className="w-full">
      <Search
        inputChanges="w-full bg-[rgb(245,245,245)] p-2 rounded"
        pChanges=" border-none"
      />
    </div>
  );
}
