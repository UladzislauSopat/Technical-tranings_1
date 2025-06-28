using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sklepAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace sklepAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KlientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KlientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Klients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Klient>>> GetKlients()
        {
            return await _context.Klients.ToListAsync();
        }

        // POST: api/Klients
        [HttpPost]
        public async Task<ActionResult<Klient>> PostKlient([FromBody] Klient klient)
        {
            _context.Klients.Add(klient);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetKlient), new { id = klient.Id }, klient);
        }

        // GET: api/Klients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Klient>> GetKlient(int id)
        {
            var klient = await _context.Klients.FindAsync(id);
            if (klient == null)
                return NotFound();
            return klient;
        }

        // PUT: api/Klients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKlient(int id, [FromBody] Klient klient)
        {
            if (id != klient.Id)
                return BadRequest();

            _context.Entry(klient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KlientExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        private bool KlientExists(int id)
        {
            return _context.Klients.Any(e => e.Id == id);
        }
    }
}
