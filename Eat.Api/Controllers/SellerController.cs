using Eat.Api.Db;
using Eat.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eat.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SellerController : ControllerBase
{
    private readonly ILogger<PositionController> _logger;
    private readonly DataContext _dataContext;

    public SellerController(ILogger<PositionController> logger, DataContext dataContext)
    {
        _logger = logger;
        _dataContext = dataContext;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Seller>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        var model = await _dataContext.Sellers
            .OrderBy(x => x.Title)
            .ToArrayAsync();
        return Ok(model);
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
    {
        var model = await _dataContext.Sellers.FindAsync(id);
        return model is null ? BadRequest() : Ok(model);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var model = await _dataContext.Sellers.FirstOrDefaultAsync(x => x.Login == id);
        return model is null ? BadRequest() : Ok(model);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Seller model)
    {
        if (model.Id != 0) return BadRequest();

        var result = await _dataContext.AddAsync(model);
        await _dataContext.SaveChangesAsync();

        return Ok(result?.Entity.Id);
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] Seller model)
    {
        if (model.Id == 0) return BadRequest();

        var entity = await _dataContext.Sellers.FindAsync(model.Id);
        if (entity is null) return BadRequest();

        //категории обновляются отдельно
        model.Categories = entity.Categories;

        var result = _dataContext.Update(model);
        await _dataContext.SaveChangesAsync();

        return Ok(result?.Entity.Id);
    }

    [HttpPost("UpdateCategories/{id}")]
    public async Task<IActionResult> UpdateCategories(long id, [FromBody] IEnumerable<Category> categories)
    {
        var seller = await _dataContext.Sellers.FindAsync(id);
        if (seller is null) return BadRequest();

        UpdateCategories(seller, categories);

        _dataContext.Update(seller);
        await _dataContext.SaveChangesAsync();
        return Ok();
    }

    private void UpdateCategories(Seller seller, IEnumerable<Category> categories)
    {
        if (!categories.Any()) return;

        var maxId = categories.Max(x => x.Id);
        var index = 0;
        foreach (var item in categories) {
            item.SortOrder = index++;
        }
        seller.Categories = categories;
    }
}

