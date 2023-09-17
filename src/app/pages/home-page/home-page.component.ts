import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';
import { INoteAdd } from '../../data/note';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    /** Объект логина */
    public note: INoteAdd = {
        user_id: -1,
        title: '',
        content: ''
    };

    constructor(public authService: AuthService, public noteService: NoteService) {}

    ngOnInit(): void {
        if (this.authService.user) {
            this.noteService.getAllNotes(+this.authService.user.id);
        }
    }

    addNote() {
        if (this.authService.user) {
            this.note.user_id = +this.authService.user.id;
            this.noteService.addNote(this.note).subscribe(response => {
                this.noteService.notesResponse$.next(response);
            });
        }
    }
}
