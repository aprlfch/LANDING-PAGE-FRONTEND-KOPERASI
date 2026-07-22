import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const chartData = {
        series: [
            {
                name: 'Anggaran Terpakai',
                data: [44, 55],
            },
            {
                name: 'Sisa Anggaran',
                data: [76, 85],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['2023', '2024'],
            },
            yaxis: {
                title: {
                    text: 'Jumlah',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};

export default ApexChart;
