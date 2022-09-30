import { Component, Input, ViewChild } from '@angular/core';
import {
  ChartComponent as Chart,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { BooksData } from '../IBooksData';
import { TableService } from '../table.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @ViewChild("chart") chart!: Chart;
  public chartOptions!: Partial<ChartOptions>;

  numberOfBooks: number[] = []
  yearOfPublish: string[] = []

  constructor(private service: TableService) {
    this.service.getData().subscribe((data) => {
      this.numberOfBooks = data.map(el => el.pageCount).slice(0, 10)
      this.yearOfPublish = data.map(el => el.publishDate).map(el => new Date(el).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' })).slice(0, 10)

      this.chartOptions = {
        series: [
          {
            name: "Number of Books",
            data: this.numberOfBooks
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Number of Books published by Year",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.yearOfPublish
        }
      };

    })
  }

}
