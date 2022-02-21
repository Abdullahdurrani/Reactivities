using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        // email, id, username are provided from identityUser
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }
}