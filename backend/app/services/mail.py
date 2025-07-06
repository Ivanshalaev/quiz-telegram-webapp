import aiosmtplib
from email.message import EmailMessage

SMTP_HOST = "smtp.mail.ru"
SMTP_PORT = 465
SMTP_USER = "vany-best@mail.ru"          # твоя почта
SMTP_PASSWORD = "IxiKTdGHIMpKQ2PDGT7N"  # см. как создать
FROM_EMAIL = SMTP_USER

async def send_confirmation_email(to_email: str, code: str):
    message = EmailMessage()
    message["From"] = FROM_EMAIL
    message["To"] = to_email
    message["Subject"] = "Добро пожаловать в Quiz WebApp! Подтвердите почту"

    message.set_content(
        f"""Здравствуйте!\n
Вы зарегистрировались в конструкторе квизов. Ваш код подтверждения:\n
🔐 {code}\n
Введите его в приложении для завершения входа.\n
С уважением, команда Quiz WebApp 🎉
        """
    )

    try:
        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            use_tls=True
        )
        return True
    except Exception as e:
        print(f"Ошибка при отправке email: {e}")
        return False
