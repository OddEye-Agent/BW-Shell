export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between bg-gradient-to-b from-navy to-navy-dark px-6 text-white">
      <div className="font-bold tracking-wide">Admin Portal</div>
      <button className="text-sm font-semibold opacity-95 hover:opacity-80">Shawn (Admin)</button>
    </header>
  );
}
