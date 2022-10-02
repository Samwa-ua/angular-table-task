import { Component, OnInit, ViewChild } from '@angular/core';
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
export class ChartComponent implements OnInit {
  @ViewChild("chart") chart!: Chart;
  public chartOptions!: Partial<ChartOptions>;

  numberOfBooks: number[] = []
  yearOfPublish: number[] = []

  constructor(private service: TableService) { }

  drawGraph() {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "bar",
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
      xaxis: {}
    };
  }

  ngOnInit() {
    this.service.getAllData().subscribe((data) => {
      this.numberOfBooks = data.map(el => el.pageCount)
      this.yearOfPublish = data.map(el => el.publishDate).map(el => Number(new Date(el).toLocaleDateString('en-US', { month: '2-digit' })))
      this.chartOptions.series = [{
        name: "Number of Books",
        data: this.numberOfBooks
      }]
      this.chartOptions.xaxis =
      {
        categories: this.yearOfPublish
      }
    })
    this.service.getGroupOfYears().subscribe((data) => {
      console.log(data);

    })
    this.drawGraph()
  }

}
