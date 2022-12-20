import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SetUserName } from 'src/app/store/game.action';
import { GameState } from 'src/app/store/game.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
gameState: GameState;
loginForm: FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private store: Store<{rootReducer: {gameState: GameState}}>
) {
  this.store
    .pipe(
      select(state => state.rootReducer))
      .subscribe((state: {gameState: GameState}) => this.gameState = state.gameState) 
}

ngOnInit() {
  this.buildForm();
}

buildForm() {
  this.loginForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
  });
}

loginSubmit() {
  if (this.loginForm.valid) {
    this.router.navigate(['/play-game']);
    this.store.dispatch(
      new SetUserName(this.loginForm.controls['username'].value)
    );
  } else {
    alert('Kullanıcı Adınızı Girin!');
  }
}
}
