import {Component, OnInit, ViewChild} from '@angular/core';
import {MotorDriversData} from "../../../interface/motor-drivers-data";
import {HttpServiceService} from "../../../services/http-service.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";

interface DataMotoCountryWins {
  country: string;
  wins: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  constructor(private htpp: HttpServiceService) {
  }

  public dataMotoCountryWins: DataMotoCountryWins[] = []

  dataSourceTable = new MatTableDataSource<DataMotoCountryWins>(this.dataMotoCountryWins)

  displayedColumns: string[] = ['country', 'wins'];

  getMotoDriversData() {
    this.htpp.getMotoSportData().subscribe((data: MotorDriversData) => {
      this.dataMotoDrivers = data
      this.dataMotoDrivers.content.sort((a, b) => {
        return a.stats.wins - b.stats.wins
      })
      console.log(this.dataMotoDrivers)
      this.dataMotoDrivers.content.map((value, index, array) => {
        if (!this.dataMotoCountryWins.find(value1 => value1.country == value.driver.countryFlag)){
          this.dataMotoCountryWins.push({country: value.driver.countryFlag, wins: value.stats.wins})
        }
        else {
          this.dataMotoCountryWins.find(value1 => value1.country == value.driver.countryFlag)!!.wins += value.stats.wins
        }
      })
      this.dataMotoCountryWins.sort( (a, b) => { return b.wins - a.wins})
      console.log(this.dataMotoCountryWins);
      this.dataSourceTable = new MatTableDataSource<DataMotoCountryWins>(this.dataMotoCountryWins)
    })
  }

  dataMotoDrivers: MotorDriversData = {
    content: [],
    number: 1,
    numberOfElements: 2,
    size: 3,
    totalElements: 4,
    totalPages: 3,
  };

  ngOnInit(): void {
    this.getMotoDriversData()
  }
}
