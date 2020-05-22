import {Component, OnInit} from '@angular/core';
import {GetRssService} from '../../getRss/get-rss.service';
import {Feed} from '../../models/feed';

@Component({
  selector: 'app-rss-panel',
  templateUrl: './rss-panel.component.html',
  styleUrls: ['./rss-panel.component.css']
})
export class RssPanelComponent implements OnInit {
  displayedRss: Feed[] =[];
  onready = false;

  constructor(private getRssService: GetRssService) {
  }

  ngOnInit() {
    this.getRssService.rssObs.subscribe(rss =>this.displayedRss = rss);

    this.getRssService.getFeedContent('https://www.sme.sk/rss-title').subscribe((res: Feed) => {
      this.getRssService.addFeed(res);
      // console.log(this.getRssService.getFeeds());
      this.onready = true;
    });
  }
}
