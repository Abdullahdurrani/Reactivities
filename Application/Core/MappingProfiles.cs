using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Create a Map from database Activity to the Updated Activity passed in body of request
            CreateMap<Activity, Activity>();
        }
    }
}