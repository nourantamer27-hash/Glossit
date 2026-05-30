export default function AboutUs() {
  // HARD LOCKED NAMES — NEVER COMPUTE THESE FROM ANY DATA SOURCE
  const SHADES = [
    "Frostbite",
    "Red Flag",
    "Love Blush",
    "Honeyed Nude",
    "Dark Espresso",
    "Delulu",
  ] as const;

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">About Glossit</h2>

        <p className="text-base leading-relaxed text-muted-foreground">
          Glossit is a modern lipgloss brand built around clean shine, bold personality, and everyday confidence.
        </p>

        <div className="mt-8">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-3">Our Shades</h3>

          {/* CRITICAL: STATIC RENDER ONLY — NO MAP TRANSFORMS FROM PRODUCTS */}
          <ul className="space-y-2 text-muted-foreground">
            <li>Frostbite</li>
            <li>Red Flag</li>
            <li>Love Blush</li>
            <li>Honeyed Nude</li>
            <li>Dark Espresso</li>
            <li>Delulu</li>
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          Each gloss is designed to stay true to its identity — no reinterpretations, no renaming.
        </p>
      </div>
    </section>
  );
}
