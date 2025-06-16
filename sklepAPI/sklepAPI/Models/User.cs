using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;
}

public class RegisterDto
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;
}

public class LoginDto
{
    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;
}