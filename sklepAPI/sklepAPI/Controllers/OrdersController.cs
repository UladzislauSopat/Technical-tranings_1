using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sklepAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders
            .Include(o => o.Products)
            .Include(o => o.Klient)
            .ToListAsync();
    }

    // GET: api/Orders/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Products)
            .Include(o => o.Klient)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();

        return order;
    }

    // POST: api/Orders
    [HttpPost]
    public async Task<ActionResult<Order>> PostOrder([FromBody] CreateOrderDto dto)
    {
        var klientExists = await _context.Klients.AnyAsync(k => k.Id == dto.KlientId);
        if (!klientExists)
            return BadRequest($"Klient with id {dto.KlientId} does not exist.");

        var productExists = await _context.Products.AnyAsync(p => p.Id == dto.ProductId);
        if (!productExists)
            return BadRequest($"Product with id {dto.ProductId} does not exist.");

        var order = new Order
        {
            ProductId = dto.ProductId,
            KlientId = dto.KlientId,
            Status = dto.Status
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    // PUT: api/Orders/{id}/status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
            return NotFound();

        order.Status = dto.Status;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

