const os = require('os')

var chart = null;
var chart2 = null;
var lastMeasureTimes = [];

var setLastMeasureTimes = (cpus) => {
	for (let i = 0; i < cpus.length; i++) {
		lastMeasureTimes[i] = getCpuTimes(cpus[i]);
	}
}

var getDatasets = () => {
	const datasets = []
	const cpus = os.cpus()

	for (let i = 0; i < cpus.length; i++) {
		const cpu = cpus[i]
		const cpuData = {
			data: getCpuTimes(cpu),
    		backgroundColor: [
        		'rgba(255, 99, 132, 1)',
        		'rgba(54, 162, 235, 1)',
    			'rgba(255, 206, 86, 1)'
      		]
    	}
    	datasets.push(cpuData)
  	}
	testCpus = os.cpus();
	  
	return datasets;
}

var getDatasets2 = () => {
	const datasets = []
	const memData = {
		data: [
			(os.totalmem - os.freemem) / 1024,
			os.freemem / 1024
		],
		backgroundColor: [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)'
		  ]
	}
	datasets.push(memData)
	return datasets;
}

var updateDatasets = () => {
	const cpus = os.cpus()
	for (let i = 0; i < cpus.length; i++) {
    	const cpu = cpus[i]
    	chart.data.datasets[i].data = getCpuTimes(cpu);
    	chart.data.datasets[i].data[0] -= lastMeasureTimes[i][0];
    	chart.data.datasets[i].data[1] -= lastMeasureTimes[i][1];
    	chart.data.datasets[i].data[2] -= lastMeasureTimes[i][2];
  	}
  	chart.update();
  	setLastMeasureTimes(cpus);
}

var updateDatasets2 = () => {
	chart2.data.datasets[0].data[0] = (os.totalmem - os.freemem) / 1024
	chart2.data.datasets[0].data[1] = os.freemem / 1024
}

var getCpuTimes = (cpu) => {
  	return [
    	cpu.times.user,
    	cpu.times.sys,
    	cpu.times.idle,
  	];
}

var drawChart = () => {
	chart = new Chart($('.chart'), {
    	type: 'doughnut',
    	data: {
    		labels: [
        		'User Time (ms)',
        		'System Time (ms)',
        		'Idle Time (ms)'
      		],
      		datasets: getDatasets()
    	},
    	options: {
    		maintainAspectRatio: false,
      		title: {
        		display: true,
        		text: 'CPU Activity',
        		fontColor: 'rgb(250, 250, 250)',
        		fontSize: 16
      		},
      		legend: {
        		display: true,
        		labels: {
          			fontColor: 'rgb(250, 250, 250)',
          			fontSize: 12
        		}
      		}
    	}
  	});

	setInterval(updateDatasets, 500);
}

var drawChart2 = () => {
	chart2 = new Chart($('.chart2'), {
		type: 'doughnut',
		data: {
			labels: [
				'Used Mem. (KB)',
				'Free Mem. (KB)'
			],
			datasets: getDatasets2()
		},
		options: {
    		maintainAspectRatio: false,
      		title: {
        		display: true,
        		text: 'Mem. Activity',
        		fontColor: 'rgb(250, 250, 250)',
        		fontSize: 16
      		},
      		legend: {
        		display: true,
        		labels: {
          			fontColor: 'rgb(250, 250, 250)',
          			fontSize: 12
        		}
      		}
    	}    
	})

	setInterval(updateDatasets2, 500);
}

$(() => {
  setLastMeasureTimes(os.cpus());
  drawChart();
  drawChart2();
})