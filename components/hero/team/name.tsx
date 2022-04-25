import { useState } from "react"

export default function HeroTeamName({ teamName, onChange, onFocus }: { teamName: string, onChange: (e: React.FormEvent<HTMLInputElement>) => void, onFocus: (e: React.FormEvent<HTMLInputElement>) => void }) {
  return (
    <input
      className="p-0.5 max-w-full xl:max-w-1/4 text-small lg:text-lg font-mono align-middle max-h-full rounded-lg bg-transparent"
      type="text"
      maxLength={30}
      size={teamName.length}
      value={teamName}
      onChange={onChange}
      onFocus={onFocus}
    />
  )
}