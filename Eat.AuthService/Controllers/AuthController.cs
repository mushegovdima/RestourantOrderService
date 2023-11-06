using Microsoft.AspNetCore.Mvc;

namespace Eat.AuthService.Controllers;

/// <summary>
/// TODO
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    public IEnumerable<string> Get()
    {
        return null;
    }
}

