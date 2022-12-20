import { Action } from "@ngrx/store";
import { SelectedItem } from "../model/game.model";

export const SET_USER_NAME = 'Set User Name';
export const SET_PC_SCORE = 'Set Pc Score';
export const SET_YOUR_SCORE = 'Set Your Score';
export const SET_RESULT_MESSAGE = 'Set Result Message';
export const RESET_STATE = 'Reset State';
export const PLAY_AGAIN = 'Play Again'
export const SET_SELECTED_ITEM = 'Set Selected Item';

export class SetUserName implements Action {
    readonly type = SET_USER_NAME;
    constructor(public payload: string) {}
}

export class SetPcScore implements Action {
    readonly type = SET_PC_SCORE;
    constructor(public payload: number){}
}

export class SetYourScore implements Action {
    readonly type = SET_YOUR_SCORE;
    constructor(public payload: number) {}
}

export class SetResultMessage implements Action {
    readonly type = SET_RESULT_MESSAGE;
    constructor(public payload: string){}
}

export class ResetState implements Action {
    readonly type = RESET_STATE;
}

export class PlayAgain implements Action {
    readonly type = PLAY_AGAIN;
}

export class SetSelectedItem implements Action {
    readonly type = SET_SELECTED_ITEM;
    constructor(public payload: SelectedItem) {}
}

export type GameActions = SetUserName | SetPcScore | SetYourScore | SetResultMessage | ResetState | PlayAgain | SetSelectedItem;