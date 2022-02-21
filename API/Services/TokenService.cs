using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateToken(AppUser user)
        {
            // claims sent back to user with Token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // sign token with key returns UTF encoding bytes, stored on server
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
            // generates digital signature, key is encryp using algo, the key is used to decryp the token
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //  place holder for all the attributes related to the issued token.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            // returns security token object
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // returns string
            return tokenHandler.WriteToken(token);
        }
    }
}
