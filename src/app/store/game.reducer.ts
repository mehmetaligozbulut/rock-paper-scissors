import { SelectedItem } from "../model/game.model";
import * as gameActions from "./game.action";

export interface GameState {
    username: string;
    pcScore: number;
    yourScore: number;
    resultMessage: string;
    selectedItem: SelectedItem;
}

const initialState: GameState = {
    username: '',
    pcScore: 0,
    yourScore: 0,
    resultMessage: '',
    selectedItem: {} as SelectedItem
}

export function gameReducer(state = initialState, action: gameActions.GameActions) {
    switch (action.type) {
        case gameActions.SET_USER_NAME:
            state = initialState;
            return {
                ...state,
                username: action.payload
            };
        case gameActions.SET_PC_SCORE:
        return {
            ...state,
            pcScore: action.payload
        }
        case gameActions.SET_YOUR_SCORE:
            return {
                ...state,
                yourScore: action.payload
            }
        case gameActions.SET_RESULT_MESSAGE:
            return {
                ...state,
                resultMessage: action.payload
            }
        case gameActions.RESET_STATE:
            return {
                ...state,
                username: '',
                pcScore: 0,
                yourScore: 0,
                resultMessage: '',
                selectedItem: {}
            }
        case gameActions.PLAY_AGAIN:
            return {
                ...state,
                pcScore: 0,
                yourScore: 0,
                selectedItem: {}
            }
        case gameActions.SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: action.payload
            }
        default:
            return state;
    }
}
