"use client";

export default function SignoutButton({ signOut }: { signOut: () => void }) {
  return (
    <button className="border rounded-xl px-4 py-2 disabled" onClick={signOut}>
      Sign Out
    </button>
  );
}
