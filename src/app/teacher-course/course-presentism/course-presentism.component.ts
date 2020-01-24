import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/model/course/course.model';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { PercentageByStudentPresent } from 'src/app/model/presentism/presentism.model';

@Component({
  selector: 'course-presentism',
  templateUrl: './course-presentism.component.html',
  styleUrls: ['./course-presentism.component.css']
})
export class CoursePresentismComponent implements OnInit {

  @Input() selectedCourse: Course;

  /* BAR CHART CONFIG */
	chartConfig = {
		barChartOptions : {
			scaleShowVerticalLines: true,
			responsive: true,
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		},
	  	barChartLegend : true,
	  	barChartType : 'bar',
  	};	
	  	
  	barChartLabels: Array<any>;
  	barChartData: Array<any>;	
  	chartReady: boolean = false;

  	/**********************************************/

  	/* PIE CHART CONFIG */
  	pieChartConfig = {
  		options: {
  			responsive: true,
		    legend: {
		      position: 'top',
		    }
  		},
  		legend: true,
  		chartType: 'pie',
  		colors: [{backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)']}]
  	}
  	pieChartLabels: any;
	  pieChartData: any;

  	/**********************************************/

  	loading: boolean = false;
  	

  	constructor(private analysisService: AnalysisService) { }

	ngOnInit() {
		this.goToAnalysis();
	}

  	goToAnalysis() {
		  this.analysisService.getAnalysisDataByCourse(this.selectedCourse.id).subscribe(res => {

			if(res != null){
				this.barChartLabels = [];
				this.barChartData = [
					{data: [], label: '% Presente', backgroundColor: 'green'},
					{data: [], label: '% Tarde', backgroundColor: 'yellow'},
					{data: [], label: '% Ausente', backgroundColor: 'red'},
				]
				res.presentismByMonth.forEach(monthData => {
					this.barChartLabels.push("Mes " + monthData.month);
					this.barChartData[0]['data'].push(
						monthData.percentagesByMonth
							.find(percentage => percentage.studentPresent === "PRESENT").percentage)

					this.barChartData[1]['data'].push(
						monthData.percentagesByMonth
							.find(percentage => percentage.studentPresent === "LATE").percentage)

					this.barChartData[2]['data'].push(
						monthData.percentagesByMonth
							.find(percentage => percentage.studentPresent === "ABSENT").percentage)
				});


				let presentAveragePercentage: PercentageByStudentPresent = res.totalAveragesPercentages
					.find(percentage => percentage.studentPresent === "PRESENT");

				let lateAveragePercentage: PercentageByStudentPresent = res.totalAveragesPercentages
					.find(percentage => percentage.studentPresent === "LATE");

				let absentAveragePercentage: PercentageByStudentPresent = res.totalAveragesPercentages
					.find(percentage => percentage.studentPresent === "ABSENT");

				this.pieChartLabels = ['Presentes', 'Tardes', 'Ausentes'];
				this.pieChartData = [presentAveragePercentage.percentage, lateAveragePercentage.percentage, absentAveragePercentage.percentage];

				this.chartReady = true;
				
			} else {
				this.chartReady = false;
			}
	  	}, err => {
	  		console.log(err);
	  		this.chartReady = false;
	  	});
	}

}
