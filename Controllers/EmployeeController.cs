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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using NorthwindAngular.DAL;
using NorthwindAngular.Models;
using AutoMapper;

// For more information on enabling Web API for empty projects, 
// visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NorthwindAngular.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private NorthwindContext _context;
        private UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        // dependency injection
        public EmployeeController(
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
        public IEnumerable<EmployeeVM> GetAllEmployees()
        {
            IEnumerable<Employee> employees = _unitOfWork.EmployeeRepository.Get();
            List<EmployeeVM> empsVM = new List<EmployeeVM>();
            foreach (var emp in employees)
            {
                EmployeeVM empVM = _mapper.Map<EmployeeVM>(emp);
                empsVM.Add(empVM);
            }
            return empsVM;
        }

        // GET: api/values
        [HttpGet("{id}", Name = "GetEmployee")]
        public IActionResult GetEmployee(int id)
        {
            Employee employee = _unitOfWork.EmployeeRepository.GetByID(id);
            if (employee == null)
            {
                return NotFound();
            }
            EmployeeVM empVM = _mapper.Map<EmployeeVM>(employee);
            return Ok(empVM);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody]EmployeeVM newEmployee)
        {
            if (newEmployee == null)
            {
                return BadRequest();
            }

            Employee emp = _mapper.Map<Employee>(newEmployee);
            _unitOfWork.EmployeeRepository.Insert(emp);
            _unitOfWork.Save();

            // Returns a 201 response, which is the standard response for an HTTP POST method 
            // that creates a new resource on the server. It also adds a Location header to the response.
            // Location header specifies the URI of the newly created item.
            return CreatedAtRoute("GetEmployee", new { id = emp.EmployeeID }, emp);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        //[Route("/api/[controller]/{id}")]
        //[Route("/api/[controller]/{id}/[action]")]
        public IActionResult Update(int id, [FromBody]EmployeeVM updatedEmployee)
        {
            if (updatedEmployee == null || updatedEmployee.EmployeeID != id)
            {
                return BadRequest();
            }

            Employee employee = _unitOfWork.EmployeeRepository.GetByID(id);
            if (employee == null)
            {
                return NotFound();
            }
            //employee  = Mapper.Map<Employee>(updatedEmployee);
            _context.Entry(employee).CurrentValues.SetValues(updatedEmployee);

            _unitOfWork.EmployeeRepository.Update(employee);
            _unitOfWork.Save();

            // The response is 204 (No Content).
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee employee = _unitOfWork.EmployeeRepository.GetByID(id);
            if (employee == null)
            {
                return NotFound();
            }

            _unitOfWork.EmployeeRepository.Delete(id);
            _unitOfWork.Save();

            return new NoContentResult();
        }
    }
}
