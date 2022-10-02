import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent as Chart,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexStroke,
} from "ng-apexcharts";
import { TableService } from '../shared/services/table.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild("chart") chart!: Chart;
  public chartOptions!: Partial<ChartOptions>;

  numberOfPages: number[] = []
  monthOfPublish: string[] = []

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
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "Number of Pages published by Month",
        align: "left"
      },
      xaxis: {}
    };
  }

  ngOnInit() {
    this.service.getAllData().subscribe((data) => {
      this.numberOfPages = data.map(el => el.pageCount)
      this.chartOptions.series = [{
        name: "Number of Books",
        data: this.numberOfPages.slice(0, 8)
      }]
    })

    this.service.getGroupOfYears().subscribe((data) => {
      this.monthOfPublish = data.map((el) => el.publishDate)

      this.chartOptions.xaxis =
      {
        categories: Array.from(new Set(this.monthOfPublish))
      }

    })
    this.drawGraph()
  }

}
