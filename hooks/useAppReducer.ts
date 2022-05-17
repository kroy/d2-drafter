import { Dispatch, useContext } from "react";
import { TeamBuilderDispatch } from "../app/reducer";
import { AppAction } from "../types/AppAction";

export function useAppReducer(): Dispatch<AppAction> {
  return useContext<Dispatch<AppAction>>(TeamBuilderDispatch)
}