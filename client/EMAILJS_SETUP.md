# EmailJS Setup Instructions

To enable email functionality in the contact form, you need to set up EmailJS (free tier available).

## Steps:

1. **Create an EmailJS account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (200 emails/month)

2. **Create an Email Service**
   - Go to "Email Services" in your EmailJS dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Copy your **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates" in your EmailJS dashboard
   - Click "Create New Template"
   - Use this template structure:
     ```
     Subject: New Contact Form Message from {{from_name}}
     
     From: {{from_name}} ({{from_email}})
     Reply-To: {{reply_to}}
     
     Message:
     {{message}}
     ```
   - Set the "To Email" field to: `franco__garcia@hotmail.com`
   - Save the template and copy your **Template ID**

4. **Get your Public Key**
   - Go to "Account" → "General" in your EmailJS dashboard
   - Copy your **Public Key**

5. **Configure Environment Variables**
   - Create a `.env` file in the `client` folder (if it doesn't exist)
   - Add these variables:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id_here
     VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
     VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
     ```
   - Replace the values with your actual credentials from EmailJS

6. **Restart your development server**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again to load the new environment variables

## Testing

After setup, test the contact form by:
1. Filling out the form with your name, email, and a test message
2. Submitting the form
3. Checking your email inbox (franco__garcia@hotmail.com) for the message

## Troubleshooting

- Make sure all environment variables are set correctly
- Check the browser console for any error messages
- Verify your EmailJS service is active and properly configured
- Ensure your email template has the correct "To Email" address
