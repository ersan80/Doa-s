using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;
using API.Config;
using Microsoft.Extensions.Logging;
using MailKit.Security; // SecureSocketOptions için

public class EmailService : IEmailService
{
    private readonly SmtpSettings _smtpSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<SmtpSettings> smtpOptions, ILogger<EmailService> logger)
    {
        _smtpSettings = smtpOptions.Value;
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_smtpSettings.FromName, _smtpSettings.FromEmail));
            message.To.Add(new MailboxAddress("", to));
            message.Subject = subject;
            message.Body = new TextPart("html") { Text = body };

            using var client = new SmtpClient();
            _logger.LogInformation("Connecting to Mailtrap SMTP: {Host}:{Port}", _smtpSettings.Host, _smtpSettings.Port);
            await client.ConnectAsync(_smtpSettings.Host, _smtpSettings.Port, SecureSocketOptions.StartTls); // STARTTLS kullan
            _logger.LogInformation("Authenticating SMTP user: {UserName}", _smtpSettings.UserName);
            await client.AuthenticateAsync(_smtpSettings.UserName, _smtpSettings.Password);
            _logger.LogInformation("Sending email to {To}", to);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            _logger.LogInformation("Email sent successfully to {To}", to);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}: {Message}", to, ex.Message);
            throw new InvalidOperationException($"Failed to send email to {to}: {ex.Message}", ex);
        }
    }
}