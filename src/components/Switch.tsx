/**
 * Switch — a small, themeable on/off toggle (controlled).
 *
 * Colors follow the active Astryx theme/mode via CSS tokens: the track uses the
 * brand color when on and the line color when off; the knob stays on-brand
 * white. The knob slides with the spring easing from the design reference.
 * Honors prefers-reduced-motion (handled by the global rule in Switch.astro-less
 * inline <style>; kept here as a scoped style tag).
 */
interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Accessible label (the visible label lives next to the switch). */
  label: string;
}

export default function Switch({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={"rt-switch" + (checked ? " on" : "")}
    >
      <span className="rt-switch-knob" aria-hidden="true" />
    </button>
  );
}
