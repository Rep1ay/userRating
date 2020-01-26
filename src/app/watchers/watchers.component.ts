import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WatchersService } from '../watchers.service';
import { Watcher } from '../watcher';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { map, tap } from 'rxjs/operators';
import { ColorPipePipe } from '../color-pipe.pipe';

export interface Winner {
  name: string;
  progress: number;
  color: ThemePalette;
}
@Component({
  selector: 'app-watchers',
  templateUrl: './watchers.component.html',
  styleUrls: ['./watchers.component.scss']
})
export class WatchersComponent implements OnInit {
  loaderColor = 'accent';
  mode = 'indeterminate';
  value = 50;
  watchersList: Watcher[] = [];
  winnersList: Watcher[] = []
  color: ColorPipePipe
  showWinners = false;
  displayedColumns: string[] = ['totalTime', 'userName', 'userId'];
  dataSource: MatTableDataSource<Watcher>;
  showLoader = true;
  winnersCount: string | number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private watchersService: WatchersService) {
    this.watchersService.getAllWatchers().pipe(tap(res => this.sortMembers(res)))
      .subscribe(res => {
        this.showLoader = false;
        res.forEach(watcher => {
          this.watchersList.push(watcher);
          this.dataSource = new MatTableDataSource(this.watchersList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.getTheWinners();
          // this.applyFilter("totalTime");
        })

      })
    this.winnersCount = localStorage.winnersCount ? localStorage.winnersCount : 10
  }

  ngOnInit() {
  }

  getTheWinner() {
   
    this.clearMemberStyle();
    setTimeout(() => {
      const min = Math.ceil(0);
      const max = Math.floor(+this.winnersCount);
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      this.winnersList[result].color = "#00BCD4";
      this.winnersList[result].nameFontSize = "70px";
    }, 5000)

  }

  clearMemberStyle(){
    this.winnersList = this.winnersList.map((winner, index) => {
      winner.color = "#7B76F5"
      winner.nameFontSize = "20px"
      winner.positionFontSize = this.changeNamePositionSize(index + 1);

      return winner
    })
  }

  sortMembers(res) {
    res.sort((a, b) => a.totalTime > b.totalTime ? -1 : 1)
  };

  getTheWinners() {
    this.winnersList = this.watchersList.slice(0, +this.winnersCount)
    this.winnersList = this.winnersList.map((winner, index) => {
      winner.color = this.changeColor(index + 1);
      winner.nameFontSize = this.changeNameFontSize(index + 1);
      winner.positionFontSize = this.changeNamePositionSize(index + 1);

      return winner
    })
  }

  scroll() {
    this.showWinners = true;
    setTimeout(() => {
      const el = document.getElementById("winners_block");
      el.scrollIntoView();
    }, 100)
  }
  

  changeColor(value) {
    let color;
    switch (value) {
      case 1:
        color = "#00BCD4"
        break;
      case 2:
        color = "#FF7E00"
        break;
      case 3:
        color = "#62C462"
        break;
      default:
        color = "#7B76F5"
    }
    return color;
  }

  changeNameFontSize(value) {
    switch (value) {
      case 1:
        value = 70
        break;
      case 2:
        value = 50
        break;
      case 3:
        value = 30
        break;
      default:
        value = 20
    }
    let result = `${value}px`;
    return result;
  }

  changeNamePositionSize(value) {
    switch (value) {
      case 1:
        value = 30
        break;
      case 2:
        value = 30
        break;
      case 3:
        value = 30
        break;
      default:
        value = 10
    }
    let result = `${value * 2}px`;
    return result;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
