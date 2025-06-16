using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher = new();

    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // ???????????
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        // ?????????
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest("Username and password are required");

        if (dto.Password.Length < 6)
            return BadRequest("Password must be at least 6 characters long");

        // ???????? ???????????? ????????????
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest("Username already exists");

        var user = new User { Username = dto.Username };
        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered!" });
    }

    // ?????
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null)
            return Unauthorized("Invalid username or password");

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (result != PasswordVerificationResult.Success)
            return Unauthorized("Invalid username or password");

        // ????? ?????? ???????? JWT-?????. ???? ?????? ?????? ?????:
        return Ok(new { message = "Login successful", userId = user.Id });
    }
}
