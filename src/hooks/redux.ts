import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector