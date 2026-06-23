import { Resend } from 'resend';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get form data
    const { name, company, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Full name, email, and message are required' 
      });
    }

    // Initialize Resend with your API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['zerofluxtechnologies@gmail.com'],
      subject: `New Quote Request from ${name}`,
      reply_to: email,
      html: `
        <h2>📋 New Quote Request</h2>
        <hr>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone (WhatsApp):</strong> ${phone || 'Not provided'}</p>
        <h3>Service Interest</h3>
        <p><strong>Service:</strong> ${service}</p>
        <h3>Message</h3>
        <p>${message}</p>
        <hr>
        <p><small>Reply directly to this email to respond to ${name}.</small></p>
      `,
    });

    // Check for errors
    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Success!
    return res.status(200).json({ 
      success: true, 
      message: 'Quote request sent successfully!' 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}