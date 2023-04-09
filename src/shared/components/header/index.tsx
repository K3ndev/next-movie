import Link from 'next/link';

// eslint-disable-next-line import/prefer-default-export
export function Header() {
  return (
    <header className="">
      <nav className="mx-auto max-w-7xl">
        <div className="flex justify-between p-7">
          <Link href="/">NextPokemon</Link>
          <div>
            <button>login</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
