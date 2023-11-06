using Eat.OrderService.Db;
using Eat.OrderService.Dto;
using Eat.OrderService.Interfaces;
using Eat.SDK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Eat.OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IEnumerable<IOrderHandler> _handlers;
    private readonly ILogger<OrderController> _logger;

    public OrderController(DataContext context, IEnumerable<IOrderHandler> handlers, ILogger<OrderController> logger)
    {
        _context = context;
        _handlers = handlers;
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(long id)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        return Ok(await _context.Orders.FindAsync(id));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] NewOrderRequest model)
    {
        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(model));

        Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(ModelState));
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var newOrder = Order.Create(model);

        await _context.Orders.AddAsync(newOrder);
        await _context.SaveChangesAsync();

        return Ok(await Notify(newOrder));
    }

    private async Task<bool> Notify(IOrder order)
    {
        var settings = await _context.HandlerSettings.FirstOrDefaultAsync(x => x.SellerId == order.SellerId);
        if (settings == null) return false;

        var handler = _handlers.FirstOrDefault(x => x.Id == settings.HandlerId);
        if (handler == null) return false;

        var data =  settings.Data is JObject jObject ? jObject.ToObject(handler.SettingsType) : settings.Data;
        return await handler.SendOrder(order, data);
    }
}

