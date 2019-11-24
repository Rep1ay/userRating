import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { WatchersService } from '../watchers.service';
import { Watcher } from '../watcher';

@Component({
  selector: 'app-watchers',
  templateUrl: './watchers.component.html',
  styleUrls: ['./watchers.component.scss']
})
export class WatchersComponent implements OnInit {
  watchersList: Watcher[] = [];

  displayedColumns: string[] = ['totalTime','userName', 'userId'];
  dataSource: MatTableDataSource<Watcher>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private watchersService: WatchersService) {
    this.watchersService.getAllWatchers().subscribe(res => {
      res.forEach( watcher => {
        this.watchersList.push(watcher);
        this.dataSource = new MatTableDataSource(this.watchersList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.applyFilter("totalTime");
      })
    })
  }

   ngOnInit() {
    
  }

  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
