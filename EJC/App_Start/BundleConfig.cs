using System.Web;
using System.Web.Optimization;

namespace EJC
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*",
                        "~/Scripts/jquery-ui-{version}.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/jquery.unobtrusive-ajax.min.js",
                      "~/Scripts/tether/tether*",
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.min.js",
                      "~/Scripts/moment.min.js",
                      "~/Scripts/data.js",
                      "~/Scripts/app.js",
                      "~/Scripts/bootstrap-datetimepicker.js",
                      "~/Scripts/Highcharts-4.0.1/js/highcharts.js",
                      "~/Scripts/Highcharts-4.0.1/js/modules/exporting.js",
                      "~/Scripts/simple-tabs.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/tether/tether*",
                      "~/Content/bootstrap*",
                      "~/Content/font-awesome.min.css"));
        }
    }
}
