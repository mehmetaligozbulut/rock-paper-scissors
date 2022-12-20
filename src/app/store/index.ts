import { Action, ActionReducer, combineReducers } from "@ngrx/store";
import { gameReducer, GameState } from "./game.reducer";

export interface AppState {
    gameState: GameState
};

export const appReducers: ActionReducer<AppState, any> = combineReducers(
    {gameState: gameReducer,}
);

export function rootReducer(state: AppState, action: Action) {
    return appReducers(state, action)
}