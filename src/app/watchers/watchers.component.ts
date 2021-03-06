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
  valueFrom;
  valueTo;
  membersTop;
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
    // this.winnersCount = localStorage.winnersCount ? localStorage.winnersCount : 10;
    this.valueFrom = localStorage.winnersRangeFrom ? localStorage.winnersRangeFrom : 1;
    this.valueTo = localStorage.winnersRangeTo || localStorage.winnersCount ? localStorage.winnersRangeTo : 10;
    this.membersTop = (+this.valueTo + 1) - +this.valueFrom;
  }

  ngOnInit() {
  }

  getTheWinner() {
    document.querySelectorAll(".winner_btn").forEach(elem => {
      elem.classList.add("winner_item")
    })
    this.clearMemberStyle();
    setTimeout(() => {
      // const valueFrom = localStorage.winnersRangeFrom ? localStorage.winnersRangeFrom : 0;
      // const valueTo = localStorage.winnersRangeTo ? localStorage.winnersRangeTo : +this.winnersCount - 1;
      const min = Math.ceil(0);
      const max = Math.floor(this.winnersList.length - 1);
      let result = Math.floor(Math.random() * (max - min + 1)) + min;
      if (this.winnersList[result]) {
        this.winnersList[result].color = "#00BCD4";
        this.winnersList[result].nameFontSize = "70px";
      } else {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        this.winnersList[result].color = "#00BCD4";
        this.winnersList[result].nameFontSize = "70px";
      }

      for (let i = 1; i < 3; i++) {
        const winnerByInd = localStorage.getItem(`winner${i}`);
        const winnerByResult = this.winnersList[result].userName;

        if (!winnerByInd) {
          localStorage.setItem(`winner${i}`, `Топ(${this.valueFrom}-${this.valueTo}) ${winnerByResult}`);
          return;
        } else {
          localStorage.setItem(`winner${i + 2}`, localStorage.getItem(`winner${i + 1}`))
          localStorage.setItem(`winner${i + 1}`, winnerByInd || '' )
          localStorage.setItem(`winner${i}`,`Топ(${this.valueFrom}-${this.valueTo}) ${winnerByResult}`)
          return;
        }
      }

      document.querySelectorAll(".winner_item").forEach(elem => {
        elem.classList.remove("winner_item")
      })
    }, 5000)

  }

  clearMemberStyle() {
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
    this.winnersList = this.watchersList.slice((+this.valueFrom - 1), +this.valueTo)
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
        color = "#62C462"
        break;
      case 2:
        color = "#FF7E00"
        break;
      case 3:
        color = "#00BCD4"
        break;
      default:
        color = "#7B76F5"
    }
    return color;
  }

  changeNameFontSize(value) {
    switch (value) {
      case 1:
        value = 65
        break;
      case 2:
        value = 45
        break;
      case 3:
        value = 25
        break;
      default:
        value = 15
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
