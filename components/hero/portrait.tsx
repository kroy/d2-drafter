import type { Hero } from "../../types/Hero";
import classnames from 'classnames';

export default function HeroPortrait({ hero, onClick }: { hero: Hero, onClick?: () => void }) {
  const attrColors: {[attr: string]: string} = {"str": "bg-red-700", "agi": "bg-emerald-700", "int": "bg-sky-700"}
  return (
    <div
      className={classnames("w-24 h-12 rounded-lg ring-2 ring-amber-400", attrColors[hero.primary_attr], {"cursor-pointer": onClick})}
      {... onClick && {onClick: onClick} }
    >
      { hero.localized_name }
    </div>
  )
}
