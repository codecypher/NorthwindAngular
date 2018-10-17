using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NorthwindAngular.Models;

namespace NorthwindAngular.DAL
{
    /// <summary>
    /// Creating the Unit of Work Class
    /// The unit of work class serves one purpose: to make sure that when you use multiple 
    /// repositories, they share a single database context. That way, when a unit of work is 
    /// complete you can call the SaveChanges method on that instance of the context and be 
    /// assured that all related changes will be coordinated. All that the class needs is a 
    /// Save method and a property for each repository.
    ///
    /// Implementing the Repository and Unit of Work Patterns in an ASP.NET MVC Application
    /// https://docs.microsoft.com/en-us/aspnet/mvc/overview/older-versions/getting-started-with-ef-5-using-mvc-4/implementing-the-repository-and-unit-of-work-patterns-in-an-asp-net-mvc-application
    /// </summary>
    public class UnitOfWork : IDisposable
    {
        private NorthwindContext _context;
        private GenericRepository<Customer> _customerRepository;
        private GenericRepository<Employee> _employeeRepository;
        private GenericRepository<Order> _orderRepository;
        private GenericRepository<Shipper> _shipperRepository;

        // Use dependency injection to set context
        public UnitOfWork(NorthwindContext context)
        {
            _context = context;
        }

        public GenericRepository<Customer> CustomerRepository
        {
            get
            {
                // Each repository property checks whether the repository already exists. 
                // If not, it instantiates the repository, passing in the context instance. 
                // As a result, all repositories share the same context instance.
                if (this._customerRepository == null)
                {
                    this._customerRepository = new GenericRepository<Customer>(_context);
                }
                return _customerRepository;
            }
        }

        public GenericRepository<Employee> EmployeeRepository
        {
            get
            {
                if (this._employeeRepository == null)
                {
                    this._employeeRepository = new GenericRepository<Employee>(_context);
                }
                return _employeeRepository;
            }
        }

        public GenericRepository<Order> OrderRepository
        {
            get
            {
                if (this._orderRepository == null)
                {
                    this._orderRepository = new GenericRepository<Order>(_context);
                }
                return _orderRepository;
            }
        }

        public GenericRepository<Shipper> ShipperRepository
        {
            get
            {
                if (this._shipperRepository == null)
                {
                    this._shipperRepository = new GenericRepository<Shipper>(_context);
                }
                return _shipperRepository;
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    if (_context != null)
                        _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
