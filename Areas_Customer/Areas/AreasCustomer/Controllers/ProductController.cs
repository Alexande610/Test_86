using Microsoft.AspNetCore.Mvc;

namespace Areas_Customer.Areas.AreasCustomer.Controllers
{
    [Area("AreasCustomer")]
    public class ProductController : Controller
    {
        // GET: Product/Index - Trang danh sách sản phẩm
        public IActionResult Index()
        {
            return View();
        }

        // GET: Product/Details - Trang chi tiết sản phẩm
        public IActionResult Details(int id = 1)
        {
            ViewBag.ProductId = id;
            return View();
        }
    }
}
