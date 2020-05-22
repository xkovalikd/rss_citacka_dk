import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BehaviorSubject, Observable, empty} from 'rxjs';
import {Feed} from '../models/feed';
import {catchError, map} from 'rxjs/operators';
import {MyFeed} from '../models/myFeed';
import { FeedEntry } from '../models/feed-entry';

@Injectable({
  providedIn: 'root'
})
export class GetRssService {
  private myFeeds: MyFeed[] = [{name: 'SME', link: 'https://www.sme.sk/rss-title'}];
  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  private rss = new BehaviorSubject<Feed[]>([]);
  rssObs = this.rss.asObservable();

  constructor(private http: Http) {}

  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(this.rssToJsonServiceBaseUrl + url)
      .pipe(map((res) => res.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error')));
  }

  getMyFeeds() {
    return this.myFeeds;
  }

  addFeed(feed){
    let rssH: any[] = this.rss.getValue();
    rssH.forEach((item, index) => {
        if(item !== feed) { rssH.splice(index, 1); }
    });
    this.rss.next(rssH);

    this.rss.next(this.rss.getValue().concat(feed));
  }
}
