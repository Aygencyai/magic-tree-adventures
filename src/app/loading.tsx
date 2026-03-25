export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
        <p className="font-accent text-gold text-lg">Loading...</p>
      </div>
    </div>
  );
}
