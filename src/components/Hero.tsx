import { useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <section>
      <h1>🐿️ Ratas</h1>
      <p>One prompt, a whole ecosystem. The agent lives inside.</p>

      {joined ? (
        <p>Thanks — you&apos;re on the list.</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setJoined(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Join waitlist</button>
        </form>
      )}
    </section>
  );
}
