import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toolsets';

  constructor(private httpClient : HttpClient){}


  upload(event : any){
    const file = event.target.files[0];
    console.log(file);

    const formdata = new FormData();
    formdata.append("file",file);

    this.httpClient.post('http://localhost:3000/file',formdata)
    .subscribe((d)=>{
      console.log(d);
      
    },error=>{console.error(error);
    })
    
  }

  uploadMultiple(event : any){
    const files : FileList = event.target.files;


    console.log(files);

    const formdata = new FormData();
    
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formdata.append("files", element );
      console.log("raw",element); 
    }
    
    this.httpClient
    .post('http://localhost:3000/multiplefiles', formdata )
    .subscribe((d)=>{
      console.log(d);
      
    },
    (error)=>{
      console.error(error);
    })
    
  }
}
