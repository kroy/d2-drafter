export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  attack_type: "Melee" | "Ranged";
  roles: string[];
  primary_attr: Attribute;
  legs: number;
}

export type Attribute = "str" | "agi" | "int"

export const placeholderHero : Hero = {
  id: 69696969696,
  name: "?missingNo",
  localized_name: "?missingNo",
  attack_type: "Melee",
  roles: [],
  primary_attr: "str",
  legs: 69
}