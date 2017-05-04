using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Web.Mvc;
using Highsoft.Web.Mvc.Charts;
using EJC.Models;
using MoreLinq;

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
            for (int i = 0; i < Linescount; i++)
            {
                List<double> tokyoVa1lues = new List<double> { 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6 };
            }
            List<double> tokyoValues = new List<double> { 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6 };
            List<double> nyValues = new List<double> { -0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5 };
            List<double> berlinValues = new List<double> { -0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0 };
            List<double> londonValues = new List<double> { 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8 };
            List<LineSeriesData> tokyoData = new List<LineSeriesData>();
            List<LineSeriesData> nyData = new List<LineSeriesData>();
            List<LineSeriesData> berlinData = new List<LineSeriesData>();
            List<LineSeriesData> londonData = new List<LineSeriesData>();

            tokyoValues.ForEach(p => tokyoData.Add(new LineSeriesData { Y = p }));
            nyValues.ForEach(p => nyData.Add(new LineSeriesData { Y = p }));
            berlinValues.ForEach(p => berlinData.Add(new LineSeriesData { Y = p }));
            londonValues.ForEach(p => londonData.Add(new LineSeriesData { Y = p }));


            ViewData["tokyoData"] = tokyoData;
            ViewData["nyData"] = nyData;
            ViewData["berlinData"] = berlinData;
            ViewData["londonData"] = londonData;
            ViewBag.ChartTitle = db.vwDatas.Where(x => x.Chart == Chartnumber).Take(1).FirstOrDefault().ChartName;
            ViewBag.Groups = db.vwGroups.ToList();
            ViewBag.Charts = db.vwCharts.Where(c => c.Group == selectedIndex).ToList();
            ViewBag.Data = fuck;
            return View();
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
    }
}