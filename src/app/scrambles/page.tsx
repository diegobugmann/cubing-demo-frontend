import ScrambleList from "@/components/ScrambleList";

export default function Page() {
  // const addScramble = async () => {
  //   await fetch("http://localhost:8080/scrambles", {
  //     method: "POST",
  //   });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 items-center">
      <div className="grid grid-cols-4 gap-4 pt-20">
        <div className="col-span-4">
          <h1 className="text-center text-4xl">History</h1>
        </div>
        <div className="col-span-4">
          <ScrambleList />
        </div>
      </div>
    </div>
  );
}
