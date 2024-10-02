// angular import
import { Component, OnInit, ViewChild } from '@angular/core';

// project import
import tableData from 'src/fake-data/default-data.json';
import { SharedModule } from 'src/app/theme/shared/shared.module';
// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexGrid,
  ApexLegend
} from 'ng-apexcharts';
import { DashbordService } from '../../service/dashbord.service';
import { BonEntreService } from '../../service/bon-entre.service';
import { BonSortieService } from '../../service/bon-sortie.service';
import { forkJoin } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
  // public props
  @ViewChild('chart') chart: ChartComponent;
  chartOptions_4: Partial<ChartOptions>;
  chartOptions_5: Partial<ChartOptions>;
  chartOptions_6: Partial<ChartOptions>;
  // eslint-disable-next-line
  monthChart: any;
  // eslint-disable-next-line
  weekChart: any;


  clientCount: number = 0;  
   chartOptions: any;

  // constructor
  constructor( private dashbordService:DashbordService,
    private bonEntree:BonEntreService,
    private bonSortie:BonSortieService
  ){}

  // life cycle event
  ngOnInit(): void {
    
    this.getClientCount();
    this.loadBonData();

  }

  loadBonData(): void {
    forkJoin({
      bonEntree: this.bonEntree.getBonEntreeByMonth(),
      bonSortie: this.bonSortie.getBonSortieByMonth(),
    }).subscribe(
      ({ bonEntree, bonSortie }) => {
        console.log("Bon Entrée Response:", bonEntree); // Log response
        console.log("Bon Sortie Response:", bonSortie); // Log response
        
        // Ensure response is of object type and not null or array
        if (typeof bonEntree === 'object' && bonEntree !== null && !Array.isArray(bonEntree)) {
          // Extract values (counts) and months from the Bon Entree data
          const bonEntreeData = Object.values(bonEntree).map(value => Number(value));
          const bonSortieData = Object.values(bonSortie).map(value => Number(value));
          const bonEntreeMonths = Object.keys(bonEntree).map(month => `Month ${month}`);

          console.log("Bon Entrée Data:", bonEntreeData); 
          console.log("Bon Sortie Data:", bonSortieData); 
          console.log("Bon Entrée Months:", bonEntreeMonths); 

          // Define chart options dynamically based on fetched data
          this.chartOptions_6 = {
            chart: {
              type: 'bar',
              height: 350,
            },
            series: [
              {
                name: "Bon Entrée",
                data: bonEntreeData, 
              },
              {
                name: "Bon Sortie",
                data: bonSortieData,
              },
            ],
            xaxis: {
              categories: ["janv","fev","mars","avril","mai","juin","juillet","aout","september","october","nouv","december"],
            },
           
          };
        } else {
          console.error("Expected an object but received:", bonEntree);
        }
      },
      (error) => {
        console.error('Error fetching bon data', error);
      }
    );
  }
  
  
  

 
  card = [

    {
      title: 'Total Clients',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'ti ti-trending-down',

   
    },
    {
      title: 'Total Fournisseur',
      background: 'bg-light-success ',
      border: 'border-success',
      icon: 'ti ti-trending-up',

    },
    {
      title: 'Total Bon Sortie',
      amount: '',
      background: 'bg-light-danger ',
      border: 'border-danger',
      icon: 'ti ti-trending-down',
      color: 'text-danger',
    },
    {
      title: 'Total Bon Entree',
      background: 'bg-light-warning ',
      border: 'border-warning',
      icon: 'ti ti-trending-up',
      color: 'text-warning',
    },
  ];

  tables = tableData;

  transaction = [
    {
      background: 'text-success bg-light-success',
      icon: 'ti ti-gift',
      title: 'Order #002434',
      time: 'Today, 2:00 AM',
      amount: '+ $1,430',
      percentage: '78%'
    },
    {
      background: 'text-primary bg-light-primary',
      icon: 'ti ti-message-circle',
      title: 'Order #984947',
      time: '5 August, 1:45 PM',
      amount: '- $302',
      percentage: '8%'
    },
    {
      background: 'text-danger bg-light-danger',
      icon: 'ti ti-settings',
      title: 'Order #988784',
      time: '7 hours ago',
      amount: '- $682',
      percentage: '16%'
    }
  ];




  getClientCount(): void {
      this.dashbordService.getClientCount().subscribe((count: number) => {
        this.clientCount = count;
        this.card[0].amount = `${count}`; 
      });
      this.dashbordService.getFournisseurCount().subscribe((count: number) => {
        this.clientCount = count;
        this.card[1].amount = `${count}`; 
      });
      this.dashbordService.getBonSortieCount().subscribe((count: number) => {
        this.clientCount = count;
        this.card[2].amount = `${count}`; 
      });
      this.dashbordService.getBonEntreeCount().subscribe((count: number) => {
        this.clientCount = count;
         this.card[3].amount = `${count}`; 
      });
    
  }


}
