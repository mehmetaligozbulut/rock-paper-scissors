import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { GameState } from "../store/game.reducer";

@Injectable()
export class LoginGuard implements CanActivate {
    gameState: GameState
    constructor(private router: Router, private store: Store<{ rootReducer: { gameState: GameState } }>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.store.pipe(
            select(state => state.rootReducer.gameState),
            take(1),
        ).subscribe((state) => this.gameState = state)
        !this.gameState.username ? this.router.navigate(['/login']) : '';
        return true
    }
}