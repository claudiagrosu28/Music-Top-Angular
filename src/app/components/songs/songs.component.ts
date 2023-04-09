import { Component,OnInit,Input,Output, EventEmitter} from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../songs';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit{
  @Input() song:Song;
  songs: Song[] = [];
  constructor(private songService: SongService){
    this.song= {
      id: 0,
      artist: '',
      name:'',
      date:'',
      votes: 0
    };
  }
  ngOnInit(): void {
    this.songService.getSongs().subscribe((songs) => (this.songs = songs,this.songs.sort((a, b) => b.votes - a.votes)));
  }
  onDelete(song:Song)
  {
    this.songService.deleteSong(song).subscribe(()=>(this.songs=this.songs.filter((t)=>t.id!==song.id)));
  }
  onVote(song:Song)
  {
    song.votes++;
    this.songs.sort((a, b) => b.votes - a.votes);
    this.songService.voteSong(song).subscribe((song) => (this.song = song));
  }
  addSong(song:Song)
  {
    this.songService.addSong(song).subscribe((song)=>(this.songs.push(song)));
  }
}
