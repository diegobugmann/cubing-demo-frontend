import Stopwatch from "@/components/Stopwatch";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/scrambles/${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 text-center pt-28">
      <h1 className="text-4xl">{data.movesAsString}</h1>
      <div className="mt-14">
        <Stopwatch id={id} />
      </div>
    </div>
  );
}
