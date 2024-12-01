const getVerifyEmailHtmlTemplate = (clientUrl, code) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">body {
            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background-color: #ffffff;
            color: #050505;
            padding: 20px;
            font-size: 16px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 20px;
        }
        .header {
            background-color: #006EF0;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            background-color: #01F8F5;
            color: #050505;
            padding: 10px 20px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #006EF0;
        }
        a, a:visited {
            color: #050505;
        }
    </style>
    </head>
    <body>
    <div class="container">
    <div class="header"><img alt="Troni Logo" src="https://troni.io/wp-content/uploads/2024/03/logo.svg" style="max-height: 50px;" /></div>
    
    <div class="content">
    <p>Hello,</p>
    
    <p>Your email has been used to register an account with Troni.io. Please click the button below to verify your email. If you haven&#39;t registered, please ignore this email.</p>
    <a class="button" href="${clientUrl}/verification/${code}">Verify Email</a>
    
    <p>If the button does not work for you, please copy and paste the below link in your browser to verify your email:</p>
    
    <p><a href="${clientUrl}/verification/${code}">${clientUrl}/verification/${code}</a></p>
    </div>

    <div class="footer">© Troni App Team</div>
    
    </div>
    </body>
    </html>`;
};


const getVerifyEmailTextTemplate = (clientUrl, code) => {
    return `Hello,

    Your email has been used to register an account with Troni.io. Please click the link below to verify your email. If you haven't registered, please ignore this email.

    ${clientUrl}/verification/${code}

    If the button does not work for you, please copy and paste the below link in your browser to verify your email:

    ${clientUrl}/verification/${code}
    
    © Troni App Team`;
};


module.exports = {
    getVerifyEmailHtmlTemplate,
    getVerifyEmailTextTemplate,
}
