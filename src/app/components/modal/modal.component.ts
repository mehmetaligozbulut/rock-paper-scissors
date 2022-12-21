import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from "@angular/core";
import { GameState } from "src/app/store/game.reducer";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent {
    @Input()
    state: GameState;
    @Input()
    openModal: boolean;

    @Output()
    closeModalEvent = new EventEmitter<string>();

    @Output()
    changeUserEvent = new EventEmitter<string>();

    @ViewChild('closebutton')
    closebutton: ElementRef;

    @ViewChild('openButton')
    openButton: ElementRef;

    constructor(){}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes && this.openModal) {
            this.openButton.nativeElement.click();
        }
    }

    playAgain() {
        this.closebutton.nativeElement.click();
        this.closeModalEvent.emit();
    }

    outsideClick(hasClickedOutside) {
        console.warn('hasClickedOutside', hasClickedOutside)
    }

    changeUser() {
        this.closebutton.nativeElement.click();
        this.changeUserEvent.emit();
    }
}