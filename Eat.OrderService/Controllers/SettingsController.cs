using Eat.OrderService.Db;
using Eat.OrderService.Dto;
using Eat.OrderService.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat.OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IEnumerable<IOrderHandler> _handlers;

    public SettingsController(DataContext context, IEnumerable<IOrderHandler> handlers)
    {
        _context = context;
        _handlers = handlers;
    }

    [HttpGet("{sellerId}")]
    public async Task<IActionResult> Get(long sellerId)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var item = await _context.HandlerSettings.FirstOrDefaultAsync(x => x.SellerId == sellerId);
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] OrderHandlerSettingsRequest model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var handler = _handlers.FirstOrDefault(x => x.Id == model.HandlerId);
        if (handler is null) return BadRequest("Handler not found");

        var data = model.Data?.ToObject(handler.SettingsType);
        var errors = await handler.CheckErrors(data);
        if (errors is not null) return BadRequest(errors);

        var entity = await _context.HandlerSettings.FirstOrDefaultAsync(x => x.SellerId == model.SellerId);
        entity ??= new OrderHandlerSettings() { SellerId = model.SellerId, HandlerId = model.HandlerId };

        entity.Data = data;
        if (entity.Id > 0) _context.Update(entity);
        else await _context.AddAsync(entity);

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("GetHandlers")]
    public IActionResult GetHandlers([FromQuery] string? country)
    {
        var handlers = _handlers
            .Where(x => x.Country == country)
            .Select(x => new OrderHandlerResponse(x));
        return Ok(handlers);
    }
}

