import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface interfaccia {

lyrics: string;

}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lyrics: string;
  artist:string;
  form: FormGroup;

 
  constructor(private http:HttpClient,public  fb:FormBuilder) { 
    this.form = fb.group({
      'artist': ['', Validators.required],
      'song': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
   
  }


  getLyrics(): void {
    console.log("ciao");
    if (!this.form.valid) {
      alert("compilare tutti i campi obbligatori!");
      return;
    }
    
    
    this.http.get<interfaccia>('https://api.lyrics.ovh/v1/'+ this.form.controls['artist'].value +'/'+this.form.controls['song'].value).subscribe(res => {
      this.lyrics=res.lyrics;

      console.log(this.lyrics);
    });
  }

}
