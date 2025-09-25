using API.Entity; // User için gerekli

public interface IJwtService
{
    string GenerateToken(User user);
}