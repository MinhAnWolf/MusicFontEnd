import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { ApiMusic } from 'src/app/core/services/ApiMusic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // fix use model
  // indeterminate determinate
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  audio = new Audio();
  listMusic = Array<any>();
  soured: any;
  testCheck: boolean = true;
  souredImgFile: any;
  pageNum: number = 1;
  pageSize: number = 10;
  totalRecored: number = 20;
  nextBtn: boolean = false;
  previousBtn: boolean = false
  optionMusic: string = 'default';
  ranNum: number = 0;

  dataTest = [
    {
      src:"https://i.ytimg.com/vi/iQWzusXhD7Q/maxresdefault.jpg "
    },
    {
      src:"https://i.ytimg.com/vi/iQWzusXhD7Q/maxresdefault.jpg "
    },
    {
      src:"https://i.ytimg.com/vi/iQWzusXhD7Q/maxresdefault.jpg "
    },
    {
      src:"https://i.ytimg.com/vi/iQWzusXhD7Q/maxresdefault.jpg "
    }
  ]

  musicModel = {
    fileName: 'Vui lòng chọn bài hát'
  };

  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
  ]
  currentTime = 0;
  duration = 0;
  indexList: number = 0;

  constructor(private apiMusic: ApiMusic,
  ) { }


  ngOnInit(): void {
    this.getList();

  }

  openFile(idFile: any, indexFile: any) {
    this.musicModel.fileName = this.listMusic[indexFile].nameFile
    this.indexList = indexFile;
    this.testCheck = true;
    console.log("indexlist : " + this.indexList)
    console.log("id OpenFile: " + idFile);
    const json = {
      id: idFile
    }
    this.apiMusic.sendData(json).subscribe(result => {
      console.log(result);
      this.mode = 'indeterminate';
      this.streamObserver('data:audio/wav;base64,' + result.data.data).subscribe(even => { });
      this.souredImgFile = result.data.imgFile;
    })
  }

  play() {
    this.testCheck = true;
    this.audio.play();
  }

  stop() {
    this.audio.currentTime = 0;
    this.audio.load();
    this.audio.pause;
  }

  pause() {
    this.testCheck = false;
    this.audio.pause();
  }

  getList() {
    var json = {
      page: this.pageNum,
      limit: this.pageSize
    }
    this.apiMusic.getList(json).subscribe(result => {
      this.listMusic = result.data;
      this.totalRecored = result.total;
      // console.log(this.listMusic)
      // var idFile = this.listMusic[this.indexList].id;
      // console.log(this.listMusic[this.indexList].id)
      // this.openFile(idFile,this.indexList);
      // this.removeEvent(this.audio,this.audioEvents,this.audio.pause())
    })
  }

  settingValues(ev: any) {
    this.audio.volume = ev.value;
  }

  streamObserver(src: any) {
    return new Observable(data => {
          this.audio.src = src;
          this.audio.load();
          this.audio.play();
          const handle = (event: Event) => {
            this.mode = 'determinate';
            this.duration = this.audio.duration;
            this.currentTime = this.audio.currentTime
            if (this.currentTime == this.duration) {
              switch (this.optionMusic) {
                case 'random':
                  console.log("random")
                  this.audio.pause();
                  this.audio.currentTime = 0;
                  this.removeEvent(this.audio, this.audioEvents, handle)
                  this.ranNum = Math.floor(Math.random() * (this.listMusic.length - 1))
                  console.log(this.listMusic.length - 1);
                  console.log(this.ranNum);
                  this.indexList = this.ranNum;
                  let idFileRandom = this.listMusic[this.indexList].id;
                  this.openFile(idFileRandom, this.indexList)
                  break;
                case 'loop':
                  this.audio.pause();
                  this.audio.currentTime = 0;
                  this.removeEvent(this.audio, this.audioEvents, handle)
                  let idFileLoop = this.listMusic[this.indexList].id;
                  this.openFile(idFileLoop, this.indexList)
                  break;
                case 'default':
                  try {
                    this.audio.pause();
                    this.audio.currentTime = 0;
                    this.removeEvent(this.audio, this.audioEvents, handle)
                    this.indexList++;
                    let idFileDefault = this.listMusic[this.indexList].id;
                    this.openFile(idFileDefault, this.indexList)
                  } catch (error) {
                    this.indexList = 0;
                    let idFileExeption = this.listMusic[this.indexList].id;
                    this.openFile(idFileExeption, this.indexList)
                  }
                  break;
              }
            }
          }
          this.addEvent(this.audio, this.audioEvents, handle);
        })
  }

  addEvent(obj: any, events: any, handler: any) {
    console.log("addEvent")
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: any, events: any, handler: any) {
    console.log("removeEvent")
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  changeTime(ev: any) {
    this.audio.currentTime = ev.value;
  }

  onPageChange(page: any) {
    this.pageNum = page.pageIndex + 1;
    this.pageSize = page.pageSize;
    this.getList();
  }

  nextPlay() {
    console.log("start index : " + this.indexList);
    if (this.indexList == 0) {
      this.indexList++;
      var idFile = this.listMusic[this.indexList].id;
      this.openFile(idFile, this.indexList);
      console.log(this.indexList)
    } else {
      this.indexList++;
      this.previousBtn = false;
      var idFile = this.listMusic[this.indexList].id;
      this.openFile(idFile, this.indexList);
      console.log("->");
    }

    if (this.indexList >= this.listMusic.length - 1) {
      console.log("Đk")
      this.nextBtn = true;
      return;
    }
  }

  previousPlay() {
    console.log("start index " + this.indexList);
    this.indexList--;
    console.log("<-" + this.indexList);
    this.nextBtn = false;
    var idFile = this.listMusic[this.indexList].id;
    this.openFile(idFile, this.indexList);
    if (this.indexList <= 0) {
      console.log("Đk " + this.indexList)
      this.previousBtn = true;
      return;
    }
  }

  randomAction() {
    console.log("start index : " + this.optionMusic);
    if (this.optionMusic == 'default' || this.optionMusic == 'loop') {
      this.optionMusic = 'random'
    } else {
      this.optionMusic = 'defaul'
    }
    console.log(this.optionMusic)
  }

  loopAction() {
    console.log("start index : " + this.optionMusic);
    if (this.optionMusic == 'default' || this.optionMusic == 'random') {
      this.optionMusic = 'loop'
    } else {
      this.optionMusic = 'default'
    }
    console.log(this.optionMusic)
  }

  nextSlide(){
    console.log("nextSlide accept");
  }

  previousSlide(){
    console.log("previousSlide accept");
  }
}
