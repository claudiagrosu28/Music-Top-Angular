import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { Song } from '../../songs';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit{
  @Output() onAddSong:EventEmitter<Song>=new EventEmitter;
  artist:string;
  name:string;
  votes:number;
  date: Date = new Date();  
  constructor(){
    this.artist='';
    this.name='';
    this.votes=0;
  }
  ngOnInit(): void {
      
  }
  onSubmit()
  {
    if(!this.artist&&!this.name)
    {
      alert('Error! Artist name or song name not written!');
      return;
    }
    const newSong=
    {
      name: this.name,
      artist: this.artist,
      votes:this.votes,
      date:this.date.toString(),
    }
    this.onAddSong.emit(newSong);

  }

}
