using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        // in production details will not be returned hence null
        public AppException(int statusCode, string message, string details = null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        // details => stack trace
        public string Details { get; set; }
    }
}