export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  attack_type: "Melee" | "Ranged";
  roles: string[];
  primary_attr: "str" | "agi" | "int";
  legs: number;
}
