using Eat.AuthService.Db;
using Eat.SDK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat.AuthService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly DataContext _dataContext;

    public UserController(ILogger<UserController> logger, DataContext dataContext)
    {
        _logger = logger;
        _dataContext = dataContext;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<IUser>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        return Ok(await _dataContext.Users.ToArrayAsync(cancellationToken));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(IUser), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get(long id, CancellationToken cancellationToken)
    {
        var user = await _dataContext.Users.FindAsync(id, cancellationToken);
        return Ok(user);
    }

    [HttpPost]
    [ProducesResponseType(typeof(IUser), StatusCodes.Status200OK)]
    public async Task<IActionResult> Post([FromBody] UserRequest model, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid) return BadRequest();

        var entity = new User
        {
            Email = model.Email,
            Phone = model.Phone,
            Name = model.Name,
        };

        var user = await _dataContext.Users.AddAsync(entity, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);
        _logger.LogInformation($"User created {user.Entity.Id}");
        return Ok(user.Entity);
    }

    [HttpPut]
    [ProducesResponseType(typeof(IUser), StatusCodes.Status200OK)]
    public async Task<IActionResult> Update([FromBody] UserRequest model, CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid || model.Id is null) return BadRequest();

        var user = await _dataContext.Users.FindAsync(model.Id, cancellationToken);
        ArgumentNullException.ThrowIfNull(user);

        //TODO если изменено - нужно отправить на подтверждение
        user.EmailConfirmed = user.Email == model.Email && user.EmailConfirmed;
        user.PhoneConfirmed = user.Phone == model.Phone && user.PhoneConfirmed;

        user.Email = model.Email;
        user.Phone = model.Phone;
        user.Name = model.Name;

        _dataContext.Update(user);
        await _dataContext.SaveChangesAsync(cancellationToken);
        return Ok(user);
    }
}

