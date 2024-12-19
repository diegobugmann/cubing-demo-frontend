import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-transparent text-white p-4 fixed top-0 left-0 w-full z-50 shadow-xl">
      <nav className="w-full flex justify-between items-center">
        {/* Left section: Home */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-semibold">Speed Cube App</h1>
          </Link>
        </div>

        {/* Right section: Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link href="/scrambles">History</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
