import { Attribute, Hero, placeholderHero } from "../../types/Hero";
import classnames from 'classnames';

export default function HeroPortrait({ hero, onClick, banned = false, children }: { hero: Hero, onClick?: () => void, banned?: boolean, children?: React.ReactNode }) {
  const isPlaceholder: boolean = hero.id === placeholderHero.id;
  const attrColors: Map<Attribute, string> = new Map([["str","bg-red-700"], ["agi", "bg-emerald-700"], ["int", "bg-sky-700"]]);
  const attrColor: string = isPlaceholder? "" : (attrColors.get(hero.primary_attr) || "");
  return (
    <div>
      <div
        className={
          classnames(
            "p-0.5 font-mono font-small font-light w-28 h-14 rounded-lg ring-2 flex items-center justify-center",
            attrColor,
            {
              "ring-amber-400": !isPlaceholder,
              "ring-slate-500": isPlaceholder || !onClick,
              "decoration-amber-400": banned,
              "line-through": banned,
              "decoration-4": banned,
              "cursor-pointer": onClick
            }
          )
        }{... onClick && {onClick: onClick} }
      >
        { hero.localized_name }
      </div>
      <div className="max-w-28">
        {children}
      </div>
    </div>
  )
}
