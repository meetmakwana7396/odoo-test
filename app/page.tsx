import SearchBar from "./_search-bar";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      Hello world
      <SearchBar />
    </main>
  );
}
