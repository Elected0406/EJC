/// <reference path="typings/jquery/jquery.d.ts" />
var vwChart = (function () {
    function vwChart(Id, Name, Group, Period, PeriodName) {
        this.Id = Id;
        this.Name = Name;
        this.Group = Group;
        this.Period = Period;
        this.PeriodName = PeriodName;
    }
    return vwChart;
}());
var vwData = (function () {
    function vwData(ID, Chart, ChartName, Line, LineName, LineType, LineTypeName, Period, PeriodName, Date, Value, Year, Month) {
        this.ID = ID;
        this.Chart = Chart;
        this.ChartName = ChartName;
        this.Line = Line;
        this.LineName = LineName;
        this.LineType = LineType;
        this.LineTypeName = LineTypeName;
        this.Period = Period;
        this.PeriodName = PeriodName;
        this.Date = Date;
        this.Value = Value;
        this.Year = Year;
        this.Month = Month;
    }
    return vwData;
}());
var ChartsList = (function () {
    function ChartsList() {
        this.charts = new Array();
    }
    ChartsList.prototype.UpdateChartList = function () {
        var _this = this;
        $.getJSON('http://localhost:39955/Home/GetCharts?id=' + $('#Groups').val(), function (data) {
            _this.charts = data;
            var select = '<select class="form-control">';
            for (var i = 2; i < _this.charts.length; i++) {
                var selectRow = '<option label="' + _this.charts[i].Name +
                    '" value="' + _this.charts[i].Id + '">' + '</option>';
            }
            select += '<option disabled selected> Select Chart</option>';
            select += selectRow;
            select += '</select>';
            $("#Chart").html(select);
        });
    };
    return ChartsList;
}());
var DataList = (function () {
    function DataList() {
        this.ChartData = new Array();
    }
    DataList.prototype.UpdateChartData = function () {
        var _this = this;
        $.getJSON('http://localhost:39955/Home/GetData?id=' + $('#Chart').val()
            + '&' + 'mindate=' + $('#mindate').val() + '&' + 'maxdate=' + $('#maxdate').val(), function (data) {
            var select = '<div class="row fpr fmt">' +
                '<div class="col-sm-6 btn-primary">' + 'ChartName' + '</div>' +
                '<div class="col-sm-1 btn-primary">' + 'Line' + '</div>' +
                '<div class="col-sm-2 btn-primary">' + 'LineName' + '</div>' +
                '<div class="col-sm-1 btn-primary">' + 'Value' + '</div>' +
                '<div class="col-sm-1 btn-primary">' + 'Year' + '</div>' +
                '<div class="col-sm-1 btn-primary">' + 'Month' + '</div>' +
                '</div>' + '<div class="row fpr">';
            for (var i = 0; i < data.length; i++) {
                _this.ChartData = data;
                var selectRow = '<div class="col-sm-6">' + _this.ChartData[i].ChartName + '</div>' +
                    '<div class="col-sm-1">' + _this.ChartData[i].Line + '</div>' +
                    '<div class="col-sm-2">' + _this.ChartData[i].LineName + '</div>' +
                    '<div class="col-sm-1">' + _this.ChartData[i].Value + '</div>' +
                    '<div class="col-sm-1">' + _this.ChartData[i].Year + '</div>' +
                    '<div class="col-sm-1">' + _this.ChartData[i].Month + '</div>';
                select += selectRow;
            }
            select += '</div>';
            $("#Data2").html(select);
        });
    };
    return DataList;
}());
var fnChart = (function () {
    function fnChart(Id, Market_ID, Market_Date, Market_Value) {
        this.Id = Id;
        this.Market_ID = Market_ID;
        this.Market_Date = Market_Date;
        this.Market_Value = Market_Value;
    }
    return fnChart;
}());
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
var chartsList = new ChartsList();
$('#Groups').change(function () { chartsList.UpdateChartList(); });
var ChartData = new DataList();
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
//# sourceMappingURL=app.js.map