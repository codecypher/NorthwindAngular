//
// Building Your First Web API with ASP.NET Core MVC and Visual Studio
// https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api
// https://docs.microsoft.com/en-us/aspnet/core/migration/webapi
// https://code.msdn.microsoft.com/AngularJS-CRUD-Operations-abcbe237
// http://www.restapitutorial.com/lessons/httpmethods.html
//
// Routing in ASP.NET Web API
// https://docs.microsoft.com/en-us/aspnet/web-api/overview/web-api-routing-and-actions/routing-in-aspnet-web-api
//
// Attribute Routing in ASP.NET Web API 2
// https://docs.microsoft.com/en-us/aspnet/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2
//
// Parameter Binding in ASP.NET Web API
// https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/parameter-binding-in-aspnet-web-api

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using NorthwindAngular.DAL;
using NorthwindAngular.Models;
using NorthwindAngular.ExtensionMethods;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, 
// visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NorthwindAngular.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private NorthwindContext _context;
        private UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        // dependency injection
        public CustomerController(
            NorthwindContext context,
            IMapper mapper
        )
        {
            _context = context;
            _unitOfWork = new UnitOfWork(context);
            _mapper = mapper;
        }

        // GET: api/values
        [HttpGet]
        //[HttpGet("[action]")]
        public IEnumerable<CustomerVM> GetAllCustomers()
        {
            IEnumerable<Customer> customers = _unitOfWork.CustomerRepository.Get();
            List<CustomerVM> customersVM = new List<CustomerVM>();
            foreach (var cust in customers)
            {
                CustomerVM custVM = _mapper.Map<CustomerVM>(cust);
                customersVM.Add(custVM);
            }
            return customersVM;
        }

        // GET: api/values
        [HttpGet]
        [Route("/api/[controller]/{customerID}/[action]")]
        public IActionResult GetOrdersByCustomer(string customerID)
        {
            IEnumerable<Order> orders = _unitOfWork.OrderRepository.Get(
                order => order.CustomerID == customerID,
                null,
                "Employee,Shipper"
            );
            List<OrderVM> ordersVM = new List<OrderVM>();
            foreach (var order in orders)
            {
                OrderVM orderVM = _mapper.Map<OrderVM>(order);
                ordersVM.Add(orderVM);
            }
            if (orders == null)
            {
                return NotFound();
            }
            return Ok(orders);
        }

        // GET: api/values
        [HttpGet]
        [Route("/api/[controller]/{id}", Name ="GetCustomer")]
        public IActionResult GetCustomer(string id)
        {
            Customer cust = _unitOfWork.CustomerRepository.GetByID(id);
            if (cust == null)
            {
                return NotFound();
            }
            CustomerVM custVM = _mapper.Map<CustomerVM>(cust);
            return Ok(custVM);
        }

        // GET: api/values
        [HttpGet]
        [Route("/api/[controller]/[action]")]
        public IActionResult GetAllShippers()
        {
            IEnumerable<Shipper> shippers = _unitOfWork.ShipperRepository.Get();
            if (shippers == null)
            {
                return NotFound();
            }
            List<ShipperVM> shippersVM = new List<ShipperVM>();
            foreach (var shipper in shippers)
            {
                ShipperVM shipperVM = _mapper.Map<ShipperVM>(shipper);
                shippersVM.Add(shipperVM);
            }
            return Ok(shippers);
        }

        [HttpGet]
        [Route("[action]/{pageIndex:int}/{pageSize:int}")]
        public PagedResponse<Customer> GetData(int pageIndex, int pageSize)
        {
            IEnumerable<Customer> customers = _unitOfWork.CustomerRepository.Get();
            return new PagedResponse<Customer>(customers, pageIndex, pageSize);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody]CustomerVM newCustomer)
        {
            if (newCustomer == null)
            {
                return BadRequest();
            }

            Customer customer = _mapper.Map<Customer>(newCustomer);
            _unitOfWork.CustomerRepository.Insert(customer);
            _unitOfWork.Save();

            // Returns a 201 response, which is the standard response for an HTTP POST method 
            // that creates a new resource on the server. It also adds a Location header to the 
            // response. Location header specifies the URI of the newly created item.
            return CreatedAtRoute("GetCustomer", new { id = customer.CustomerID }, customer);
            //return StatusCode(201, customer);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        //[Route("/api/[controller]/{id}")]
        //[Route("/api/[controller]/{id}/[action]")]
        public IActionResult Update(string id, [FromBody]CustomerVM updatedCustomer)
        {
            if (updatedCustomer == null || updatedCustomer.CustomerID != id)
            {
                return BadRequest();
            }

            Customer customer = _unitOfWork.CustomerRepository.GetByID(id);
            if (customer == null)
            {
                return NotFound();
            }
            //customer = _mapper.Map<Customer>(updatedCustomer);
            _context.Entry(customer).CurrentValues.SetValues(updatedCustomer);

            _unitOfWork.CustomerRepository.Update(customer);
            _unitOfWork.Save();

            // The response is 204 (No Content).
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Customer customer = _unitOfWork.CustomerRepository.GetByID(id);
            if (customer == null)
            {
                return NotFound();
            }

            _unitOfWork.CustomerRepository.Delete(id);
            _unitOfWork.Save();

            return new NoContentResult();
        }
    }
}
