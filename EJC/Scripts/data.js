$(function () {
    $('#datetimepicker1').datetimepicker(
        { format: "MM.DD.YYYY" });
    $('#datetimepicker2').datetimepicker({
        format: "MM.DD.YYYY"
    });
    $("#datetimepicker1").on("dp.change", function (e) {
        $("#datetimepicker2").data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker2").on("dp.change", function (e) {
        $("#datetimepicker1").data("DateTimePicker").maxDate(e.date);
    });
});