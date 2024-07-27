import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use the generated app password here
  }
});

// Function to send welcome email

export const sendWelcomeEmail = async (to: string, username: string) => {
  if (!to) {
    throw new Error('Recipient email address is missing');
  }

  
  // Define the HTML content directly
  const html = `
  <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Rent Easy Car Rental Email Template HTML</title>
    <style>
        body {
            background-color: #f1f1f1;
            font-family: 'Montserrat', sans-serif;
        }

        .container {
            width: 600px;
            margin: 0 auto;
            background-color: white;
            text-align: center;
            font-size: 15px;
            line-height: 1.8;
            max-width: 600px;
        }

        .header {
            text-transform: uppercase;
            font-size: 20px;
        }

        .welcome {
            font-family: 'Playfair Display', serif;
            color: black;
            font-size: 25px;
            margin-top: 10px;
        }

        .thank-you {
            font-family: 'Montserrat', sans-serif;
            color: black;
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
        }

        .banner {
            height: 400px;
            background-image: url('https://www.pexels.com/photo/white-sedan-parking-on-the-road-4174730/');
            background-size: cover;
            padding: 0 40px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
        }

        .banner h2 {
            font-family: 'Playfair Display', serif;
            color: white;
            font-size: 30px;
            margin: 0;
        }

        .banner p {
            color: rgba(255, 255, 255, 0.8);
        }

        .banner a {
            color: white;
            background-color: #f3a333;
            text-decoration: none;
            padding: 10px 15px;
            border-radius: 30px;
        }

        .services {
            background-color: rgba(0, 0, 0, 0.8);
            padding: 40px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
        }

        .services span {
            color: rgba(255, 255, 255, 0.4);
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-bottom: #f3a333 3px solid;
            padding-bottom: 10px;
        }

        .services h2 {
            font-family: 'Playfair Display', serif;
            color: white;
            font-size: 30px;
            margin-bottom: 0;
            margin-top: 10px;
        }

        .services p {
            color: rgba(255, 255, 255, 0.8);
        }

        .footer {
            padding: 40px;
            color: rgba(0, 0, 0, 0.4);
            text-align: center;
        }

        .footer span {
            color: rgba(0, 0, 0, 0.4);
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-bottom: #f3a333 3px solid;
            padding-bottom: 10px;
        }

        .footer h2 {
            font-family: 'Playfair Display', serif;
            color: black;
            font-size: 30px;
            margin-bottom: 0;
            margin-top: 10px;
        }

        .service-item {
            padding-top: 20px;
            text-align: center;
        }

        .service-item img {
            margin: auto;
            display: block;
        }

        .service-item h3 {
            font-size: 20px;
            color: black;
            font-family: 'Playfair Display', serif;
            margin-top: 0;
        }

        .service-item p {
            color: black;
        }

        .contact-info {
            background-color: #000000;
            padding: 40px;
            color: rgba(255, 255, 255, 0.5);
            text-align: left;
        }

        .contact-info h3 {
            color: white;
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            margin-top: 0;
        }

        .contact-info a {
            text-decoration: none;
            color: white;
            margin-bottom: 10px;
            display: block;
        }

        .contact-info p {
            color: rgba(255, 255, 255, 0.5);
        }

        .bottom {
            background-color: black;
            color: rgba(255, 255, 255, 0.5);
            padding: 0 40px;
            text-align: left;
        }

        .bottom a {
            text-decoration: none;
            color: rgba(255, 255, 255, 0.5);
        }

        .bottom p {
            margin: 0;
        }
    </style>
</head>

<body>
    <table cellpadding="0" cellspacing="0" class="container">
        <tbody>
            <tr>
                <td class="header">
                    <h1><a href="#" style="text-decoration: none; color: black;">Rent Easy Car Rental</a></h1>
                </td>
            </tr>
            <tr>
                <td>
                    <h2 class="welcome">Welcome, ${username}!</h2>
                    <p class="thank-you">Thank you for choosing Rent Easy Car Rental. We're thrilled to have you with us!</p>
                </td>
            </tr>
            <tr>
                <td class="banner">
                    <div>
                        <h2>Your Journey Begins Here</h2>
                        <p>Explore the world with our wide range of vehicles. Drive easy with Rent Easy!</p>
                        <a href="#">Book Your Car Now!</a>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="services">
                    <div>
                        <span>Our Services</span>
                        <h2>Why Choose Us?</h2>
                        <p>At Rent Easy Car Rental, we provide top-notch services to ensure you have the best rental experience.</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <div>
                        <span>What We Offer</span>
                        <h2>Our Benefits</h2>
                        <p>We offer a variety of benefits to make your rental experience smooth and enjoyable.</p>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td width="50%" class="service-item">
                                    <img width="60px" src="https://www.flaticon.com/svg/static/icons/svg/1207/1207374.svg" />
                                    <h3>Wide Selection</h3>
                                    <p>Choose from a variety of vehicles to suit your needs.</p>
                                </td>
                                <td width="50%" class="service-item">
                                    <img width="60px" src="https://www.flaticon.com/svg/static/icons/svg/3159/3159062.svg" />
                                    <h3>Affordable Rates</h3>
                                    <p>We offer competitive rates to fit your budget.</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="50%" class="service-item">
                                    <img width="60px" src="https://www.flaticon.com/svg/static/icons/svg/2945/2945890.svg" />
                                    <h3>24/7 Support</h3>
                                    <p>Our customer support team is available around the clock.</p>
                                </td>
                                <td width="50%" class="service-item">
                                    <img width="60px" src="https://www.flaticon.com/svg/static/icons/svg/3062/3062634.svg" />
                                    <h3>Easy Booking</h3>
                                    <p>Book your vehicle online with just a few clicks.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td class="contact-info">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style="text-align: left; padding-right: 10px;">
                                                                    <h3>Rent Easy Car Rental</h3>
                                                                    <p>Your trusted partner in car rentals. We ensure you have a smooth ride every time.</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td valign="top">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style="text-align: left; padding-right: 10px;">
                                                                    <h3>Contact Info</h3>
                                                                    <p>123 Easy Street, Rentville, CA, USA</p>
                                                                    <p>+1 234 567 890</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td valign="top" width="30%">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td style="text-align: left; padding-right: 10px;">
                                                                    <h3>Quick Links</h3>
                                                                    <a href="#suvs">SUVs</a>
                                                                    <a href="#sedans">Sedans</a>
                                                                    <a href="#trucks">Trucks</a>
                                                                    <a href="#luxury">Luxury</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="bottom">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td width="70%">
                                                    <p>© 2024 Rent Easy Car Rental. All Rights Reserved</p>
                                                </td>
                                                <td width="30%" style="text-align: right;">
                                                    <a href="#">Unsubscribe</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>

  `;

  // Define mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to Kavatha\'s Culinary Haven',
    html
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
