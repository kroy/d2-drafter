import type { Hero } from "../../types/Hero";
import classnames from 'classnames';

export default function HeroPortrait({ hero, onClick }: { hero: Hero, onClick?: () => void }) {
  return (
    <div
      className={classnames("w-24 h-12 rounded-lg ring-2 ring-amber-400 bg-red-700", {"cursor-pointer": onClick})}
      {... onClick && {onClick: onClick} }
    >
      { hero.localized_name }
    </div>
  )
}
