import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trading-volume',
  templateUrl: './trading-volume.component.html',
  styleUrls: ['./trading-volume.component.css']
})
export class TradingVolumeComponent implements OnInit {

  @Input() startDate: String = "";
  @Input() endDate: String = "";

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    
  }
}
