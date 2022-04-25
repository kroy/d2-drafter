import type { Hero } from "../../types/Hero";

export default function HeroIcon({ hero }: { hero: Hero }) {
  return (
    <div>
      {hero.localized_name.split(" ").map((piece) => piece.charAt(0)).join("")}
    </div>
  )
}