using Microsoft.AspNetCore.Mvc;

namespace Areas_Customer.Areas.AreasCustomer.Controllers
{
    [Area("AreasCustomer")]
    public class HomeController : Controller
    {
        // GET: Home/Index - Trang chủ
        public IActionResult Index()
        {
            return View();
        }
    }
}
