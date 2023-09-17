import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { EHttpMethod, IHttpResponse } from '../data/http-request';
import { environment } from '../../environments/environment';
import { INote, INoteAdd } from '../data/note';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    /** Объект результата запроса получения записей */
    notesResponse$: BehaviorSubject<IHttpResponse<INote[]>> = new BehaviorSubject<IHttpResponse<INote[]>>({});

    constructor(private http: HttpRequestService) {}

    /** Добавить запись */
    addNote(note: INoteAdd) {
        return this.http.request<INote[]>(EHttpMethod.POST, environment.serverEndpoint + '/note', note);
    }

    getAllNotes(userId: number): void {
        if (!this.notesResponse$.value.body) {
            this.http.request<INote[]>(EHttpMethod.GET, environment.serverEndpoint + '/note', { user_id: userId }).subscribe(response => {
                this.notesResponse$.next(response);
            });
        }
    }
}
