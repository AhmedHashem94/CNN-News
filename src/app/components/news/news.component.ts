import { NewsService } from "./news.service";
import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  // listen to window resize
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.isSmallDevice = true;
      this.isMidDevice = false;
    } else if (event.target.innerWidth < 992) {
      this.isMidDevice = true;
      this.isSmallDevice = false;
    } else {
      this.isSmallDevice = false;
      this.isMidDevice = false;
    }
  }
  isSmallDevice: boolean;
  isMidDevice: boolean;
  title: string;
  allNews: any[];
  slicedNews: any[];
  noMore: boolean;
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews().subscribe((resData: any) => {
      this.title = resData.feed.title;
      this.allNews = resData.items;
      this.slicedNews = this.allNews.slice(0, 7);
    });
  }
  onAddMore() {
    this.slicedNews = this.allNews;
    this.noMore = true;
  }
}
