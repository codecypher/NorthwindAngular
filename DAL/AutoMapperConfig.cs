using System;
using System.Collections.Generic;
using System.Linq;
using NorthwindAngular.Models;
using AutoMapper;

namespace NorthwindAngular.DAL
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() : this("AutoMapperConfig")
        {
        }

        protected AutoMapperConfig(string profileName) : base(profileName)
        {
            //CreateMap<Book, BookViewModel>()
            //    .ForMember(dest => dest.BootTitle, opts => opts.MapFrom(src => src.Title));
            CreateMap<Employee, Employee>();
            CreateMap<EmployeeVM, Employee>();
            CreateMap<EmployeeVM, Employee>().ReverseMap();
            CreateMap<CustomerVM, Customer>();
            CreateMap<CustomerVM, Customer>().ReverseMap();
            CreateMap<OrderVM, Order>();
            CreateMap<OrderVM, Order>().ReverseMap();
            CreateMap<ShipperVM, Shipper>();
            CreateMap<ShipperVM, Shipper>().ReverseMap();
        }
    }
}