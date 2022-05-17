import { Dispatch, useContext } from "react";
import { TeamBuilderDispatch } from "../app/reducer";
import { Action } from "../types/AppActions";

export function useAppReducer(): Dispatch<Action> {
  return useContext<Dispatch<Action>>(TeamBuilderDispatch)
}