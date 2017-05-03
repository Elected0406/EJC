/// <reference path="typings/jquery/jquery.d.ts" />

interface IvwChart {
    Id: number;
    Name: string;
    Group: number;
    Period: number;
    PeriodName: string;
}
class vwChart implements IvwChart {
    constructor(
        public Id: number,
        public Name: string,
        public Group: number,
        public Period: number,
        public PeriodName: string) { }
}
interface IvwData {
    ID: number;
    Chart: number;
    ChartName: string;
    Line: number;
    LineName: string;
    LineType: number;
    LineTypeName: string;
    Period: number;
    PeriodName: string;
    Date: string;
    Value: number;
    Year: number;
    Month: number;
}
class vwData implements IvwData {
    constructor(
        public ID: number,
        public Chart: number,
        public ChartName: string,
        public Line: number,
        public LineName: string,
        public LineType: number,
        public LineTypeName: string,
        public Period: number,
        public PeriodName: string,
        public Date: string,
        public Value: number,
        public Year: number,
        public Month: number) { }
}
class ChartsList {
    public charts: Array<vwChart> = new Array<vwChart>();
    UpdateChartList(): void {
        $.getJSON('http://localhost:39955/Home/GetCharts?id=' + $('#Groups').val(),
            (data) => {
                this.charts = data;
                var select = '<select class="form-control">'
                for (var i = 2; i < this.charts.length; i++) {
                    var selectRow =
                        '<option label="' + this.charts[i].Name +
                        '" value="' + this.charts[i].Id + '">' + '</option>';
                }
                select += '<option disabled selected> Select Chart</option>';
                select += selectRow;
                select += '</select>';
                $("#Chart").html(select);
            });
    }
}
class DataList {
    public ChartData: Array<vwData> = new Array<vwData>();
    UpdateChartData(): void {

        $.getJSON('http://localhost:39955/Home/GetData?id=' + $('#Chart').val()
            + '&' + 'mindate=' + $('#mindate').val() + '&' + 'maxdate=' + $('#maxdate').val(),
            (data) => {

                var select =
                    '<div class="row fpr fmt">' +
                    '<div class="col-sm-6 btn-primary">' + 'ChartName' + '</div>' +
                    '<div class="col-sm-1 btn-primary">' + 'Line' + '</div>' +
                    '<div class="col-sm-2 btn-primary">' + 'LineName' + '</div>' +
                    '<div class="col-sm-1 btn-primary">' + 'Value' + '</div>' +
                    '<div class="col-sm-1 btn-primary">' + 'Year' + '</div>' +
                    '<div class="col-sm-1 btn-primary">' + 'Month' + '</div>' +
                    '</div>' + '<div class="row fpr">';
                for (var i = 0; i < data.length; i++) {
                    this.ChartData = data
                    var selectRow =
                        '<div class="col-sm-6">' + this.ChartData[i].ChartName + '</div>' +
                        '<div class="col-sm-1">' + this.ChartData[i].Line + '</div>' +
                        '<div class="col-sm-2">' + this.ChartData[i].LineName + '</div>' +
                        '<div class="col-sm-1">' + this.ChartData[i].Value + '</div>' +
                        '<div class="col-sm-1">' + this.ChartData[i].Year + '</div>' +
                        '<div class="col-sm-1">' + this.ChartData[i].Month + '</div>';
                    select += selectRow;
                }
                select += '</div>';
                $("#Data2").html(select);
            });
    }
}
interface IfnChart {
    Id: number;
    Market_ID: number;
    Market_Date: string;
    Market_Value: number;
}
class fnChart implements IfnChart {
    constructor(
        public Id: number,
        public Market_ID: number,
        public Market_Date: string,
        public Market_Value: number) { }
}
//class fnChart99 {
//    public fnChart99Data: Array<fnChart> = new Array<fnChart>();
//    LoadfnChart99Data(): void {
//        $.getJSON('http://localhost:4051/Home/GetChart99',
//            (data) => {
//                var select = '<div class="row fpr">';
//                for (var i = 0; i < data.length; i++) {
//                    this.fnChart99Data = data
//                    var selectRow =
//                        '<div class="col-sm-7">' + this.fnChart99Data[i].Market_Date + '</div>' +
//                        '<div class="col-sm-4">' + this.fnChart99Data[i].Market_Value + '</div>';
//                    select += selectRow;
//                }   
//                select += '</div>';   
//                $("#datar1").html(select);
//                });
//}
//}
//class fnChart101 {
//    public fnChart101Data: Array<fnChart> = new Array<fnChart>();
//    LoadfnChart101Data(): void {
//        $.getJSON('http://localhost:4051/Home/GetChart101',
//            (data) => {
//                var select = '<div class="row fpr">';
//                for (var i = 0; i < data.length; i++) {
//                    this.fnChart101Data = data
//                    var selectRow =
//                        '<div class="col-sm-7">' + this.fnChart101Data[i].Market_Date + '</div>' +
//                        '<div class="col-sm-4">' + this.fnChart101Data[i].Market_Value + '</div>';
//                    select += selectRow;
//                }
//                select += '</div>';
//                $("#datar2").html(select);
//            });
//    }
//}
//class fnChart995 {
//    public fnChart995Data: Array<fnChart> = new Array<fnChart>();
//    LoadfnChart995Data(): void {
//        $.getJSON('http://localhost:4051/Home/GetChart995',
//            (data) => {
//                var select = '[';
//                for (var i = 0; i < data.length; i++) {
//                    this.fnChart995Data = data
//                    var selectRow =                       
//                         this.fnChart995Data[i].Market_Value + ',' ;
//                    select += selectRow;
//                }
//                select += '0]';
//                return select;
//            });
//    }
//}

var chartsList: ChartsList = new ChartsList();
$('#Groups').change(function () { chartsList.UpdateChartList(); });
var ChartData: DataList = new DataList();
$('#displayBtn').click(function () { ChartData.UpdateChartData(); });
//var fnChart99Data: fnChart99 = new fnChart99();
//fnChart99Data.LoadfnChart99Data(); 
//var fnChart101Data: fnChart101 = new fnChart101();
//fnChart101Data.LoadfnChart101Data(); 
//var fnChart995Data: fnChart995 = new fnChart995();
//fnChart995Data.LoadfnChart995Data();






//var temperatures = [7, 1.7, 1.3, 1.3, 1.2, 0.9, 0.6, 0.6, 0.6, 1.2, 3.3, 6.6, 8.7, 10.5];
//var Chartname = 'Chart 2';
//var name = 'Power Belgium Spot EUR/MWh';
//var titletext = 'Chart 2';
//var seriesname = '';
//var seriesdata = '';