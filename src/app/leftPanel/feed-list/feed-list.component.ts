import {Component, OnInit} from '@angular/core';
import {Feed} from '../../models/feed';
import {MyFeed} from '../../models/myFeed';
import {GetRssService} from '../../getRss/get-rss.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  myFeeds: MyFeed[] = [];
  filteredfeeds: MyFeed[] = [];
  name;
  link;

  constructor(private getRssService: GetRssService) {
  }

  ngOnInit() {
    this.myFeeds = this.getRssService.getMyFeeds();
    this.filteredfeeds = this.myFeeds;
  }

  addFeeds(first, second) {
    this.myFeeds = [{name: first, link: second}];
    this.filteredfeeds = this.myFeeds;
    this.getRssService.getFeedContent(second).subscribe((res: Feed) => {
      this.getRssService.addFeed(res);});
  }

}
