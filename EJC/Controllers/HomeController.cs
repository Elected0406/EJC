using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using MoreLinq;
using DotNet.Highcharts;
using DotNet.Highcharts.Enums;
using DotNet.Highcharts.Helpers;
using DotNet.Highcharts.Options;
using System.Drawing;
using EJC.Models;

namespace Energiejournaal.Controllers
{
    public class HomeController : Controller
    {
        private EnergyTerminalN db = new EnergyTerminalN();
        int selectedIndex = 1;
        public ActionResult Index()
        {
            var Chartnumber = 52;
            var Datas = db.vwDatas.Where(x => x.Chart == Chartnumber);
            var Linescount = Datas.DistinctBy(x => x.Line).Count();
            var Linename = Datas.DistinctBy(x => x.LineName);
            var fuck = Linename.ToList();
            var ChartTitle = db.vwDatas.Where(x => x.Chart == Chartnumber).Take(1).FirstOrDefault().ChartName;
            var lines = db.vwLines.Where(x => x.Chart == Chartnumber).OrderBy(x => x.ID).ToList();
            ViewBag.Groups = db.vwGroups.ToList();
            ViewBag.Charts = db.vwCharts.Where(c => c.Group == selectedIndex).ToList();
            Highcharts chart = new Highcharts("chart")
                .InitChart(new Chart
                {
                    DefaultSeriesType = ChartTypes.Line,
                    MarginRight = 130,
                    MarginBottom = 25,
                    ClassName = "chart"
                })
                .SetTitle(new Title
                {
                    Text = ChartTitle,
                    X = -20
                })
                .SetSubtitle(new Subtitle
                {
                    Text = "Source: www.energiejournaal.be",
                    X = -20
                })
                .SetXAxis(new XAxis { Categories = ChartsData.Categories })
                .SetYAxis(new YAxis
                {
                    Title = new YAxisTitle { Text = "" },
                    PlotLines = new[]
                    {
                        new YAxisPlotLines
                        {
                            Value = 0,
                            Width = 1,
                            Color = ColorTranslator.FromHtml("#808080")
                        }
                    }
                })
                .SetTooltip(new Tooltip
                {
                    Formatter = @"function() {
                                        return '<b>'+ this.series.name +'</b><br/>'+
                                    this.x +': '+ this.y;
                                }"
                })
                .SetLegend(new Legend
                {
                    Layout = Layouts.Vertical,
                    Align = HorizontalAligns.Right,
                    VerticalAlign = VerticalAligns.Top,
                    X = -10,
                    Y = 100,
                    BorderWidth = 0
                })
                .SetSeries(new[]
                {
                    new Series { Name = "Tokyo", Data = new Data(ChartsData.TokioData) },
                    new Series { Name = "New York", Data = new Data(ChartsData.NewYorkData) },
                    new Series { Name = "Berlin", Data = new Data(ChartsData.BerlinData) },
                    new Series { Name = "London", Data = new Data(ChartsData.LondonData) }
                }
                );

            return View(chart);
        }
        public JsonResult GetCharts(int id)
        {
            var Chart = db.vwCharts.Where(p => p.Group == id).ToList();
            return Json(Chart, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int id, DateTime mindate, DateTime maxdate)
        {

            var chartdata = db.vwDatas.Where(p => p.Chart == id).Where(s => s.Date >= mindate).Where(s => s.Date <= maxdate).ToList();
            var chartdatacount = chartdata.Count;
            return Json(chartdata, JsonRequestBehavior.AllowGet);
        }
        public ActionResult MidleChart()
        {
            Highcharts chart = new Highcharts("chart")
            .SetXAxis(new XAxis
            {
                Categories = new[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" }
            })
            .SetSeries(new Series
            {
                Data = new Data(new object[] { 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4 })
            });

            return View(chart);
        }
    }
}