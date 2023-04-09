import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Song } from '../songs'

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = 'https://overjoyed-sulky-charger.glitch.me/melodii';
  constructor(private http: HttpClient) { }
  getSongs():Observable<Song[]>
  {
    return this.http.get<Song[]>(this.apiUrl);
  }
  deleteSong(song:Song):Observable<Song>
  {
    const url = `${this.apiUrl}/${song.id}`;
    return this.http.delete<Song>(url);
  }
  voteSong(song:Song):Observable<Song>
  {
    const url = `${this.apiUrl}/${song.id}`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    };
    return this.http.put<Song>(url,song,httpOptions);
  }
  addSong(song:Song):Observable<Song>
  {
    return this.http.post<Song>(this.apiUrl,song);
  }
}
