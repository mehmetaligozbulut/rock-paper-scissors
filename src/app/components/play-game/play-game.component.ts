import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PlayAgain, ResetState, SetPcScore, SetResultMessage, SetSelectedItem, SetYourScore } from 'src/app/store/game.action';
import { GameState } from 'src/app/store/game.reducer';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit, OnDestroy {
  gameState: GameState;
  playerPC: number = 0;
  playerYou: number = 0;
  list = ['Taş', 'Kağıt', 'Makas'];
  openModal: boolean = false;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<{rootReducer: {gameState: GameState}}>
    ) {
    this.store
    .pipe(
      select(state => state.rootReducer))
      .subscribe((state: {gameState: GameState}) => this.gameState = state.gameState) 
  }

  ngOnInit() {}

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.store.dispatch(new ResetState());
  }

  buttonClick(event: string) {
    let resultMessage: string;
    this.store.dispatch(new SetSelectedItem({
      your: event,
      pc: this.list[Math.floor(Math.random() * this.list.length)]
    }))
    if (this.gameState.selectedItem.your === this.gameState.selectedItem.pc) {
      this.playerPC <= 2 ? this.playerPC++ : (this.playerPC = this.playerPC);
      this.playerYou <= 2 ? this.playerYou++ : (this.playerYou = this.playerYou);
    } else if (
      (this.gameState.selectedItem.your === 'Taş' && this.gameState.selectedItem.pc === 'Kağıt') ||
      (this.gameState.selectedItem.your === 'Kağıt' && this.gameState.selectedItem.pc === 'Makas') ||
      (this.gameState.selectedItem.your === 'Makas' && this.gameState.selectedItem.pc === 'Taş')
    ) {
      this.playerPC <= 2 ? this.playerPC++ : (this.playerPC = this.playerPC);
    } else {
      this.playerYou <= 2 ? this.playerYou++ : (this.playerYou = this.playerYou);
    }

    if (this.playerPC === 3 || this.playerYou === 3) {
      this.openModal = true;
      this.cdRef.detectChanges()
    }

    if (this.playerPC === 3 && this.playerYou === 3) {
      resultMessage = 'Berabere';
    } else if (this.playerYou === 3) {
      resultMessage = 'Kazandınız';
    } else {
      resultMessage = 'Kaybettiniz';
    }
    
    this.store.dispatch(new SetPcScore(this.playerPC));
    this.store.dispatch(new SetYourScore(this.playerYou));
    this.store.dispatch(new SetResultMessage(resultMessage));
  }

  closeModal() {
    this.store.dispatch(new PlayAgain());
    this.playerPC = 0;
    this.playerYou = 0;
    this.openModal = false;
  }

  changeUser() {
    this.store.dispatch(new ResetState());
    this.playerPC = 0;
    this.playerYou = 0;
    this.openModal = false;
    this.router.navigate(['/login'])
  }
}
