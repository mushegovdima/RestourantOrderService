using Eat.Api.Db;
using Eat.Api.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PositionController : ControllerBase
{
    private readonly ILogger<PositionController> _logger;
    private readonly DataContext _dataContext;

    public PositionController(ILogger<PositionController> logger, DataContext dataContext)
    {
        _logger = logger;
        _dataContext = dataContext;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var model = await _dataContext.Positions
            .OrderBy(x => x.Title)
            .ToArrayAsync();
        return Ok(model);
    }

    [HttpPost("byFilter")]
    [ProducesResponseType(typeof(IEnumerable<Position>), StatusCodes.Status200OK)]
    public async Task<IActionResult> ByFilter([FromBody] PositionFilter filter)
    {
        var model = await _dataContext.Positions
            .Where(x => x.SellerId == filter.SellerId)
            .OrderBy(x => x.Title)
            .ToArrayAsync();
        return Ok(model);
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
    {
        var model = await _dataContext.Positions.FindAsync(id);
        return model is null ? BadRequest() : Ok(model);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Position model)
    {
        if (model.Id != 0) return BadRequest();

        var result = await _dataContext.AddAsync(model);
        await _dataContext.SaveChangesAsync();
        return Ok(result?.Entity.Id);
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] Position model)
    {
        if (model.Id == 0) return BadRequest();

        var result = _dataContext.Update(model);
        await _dataContext.SaveChangesAsync();

        return Ok(result?.Entity.Id);
    }
}

